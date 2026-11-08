import alisonScrapedData from "@/public/alison_scraped_data.json";

export interface OrderPhoto {
  readonly src: string;
  readonly name: string;
}

const CARGO_PAGE_URL = "https://asiegel.cargo.site/a-squared-photos";
const CARGO_PAGE_PURL = "a-squared-photos";
const CARGO_FREIGHT_WIDTH = 800;
const ORDER_FORM_LIST_ID = "order-form-list";
const REVALIDATE_SECONDS = 3600;
const USE_CARGO_JSON_FALLBACK = true;

function isStringArray(value: unknown): value is readonly string[] {
  return (
    Array.isArray(value) && value.every((entry) => typeof entry === "string")
  );
}

function photoNameFromUrl(src: string): string {
  const segment = src.split("/").pop();
  return segment ? decodeURIComponent(segment) : src;
}

function normalizeFreightUrl(url: string): string {
  return url
    .replace(/\/w\/\d+\//, `/w/${CARGO_FREIGHT_WIDTH}/`)
    .replace(/\/q\/\d+\//, "/");
}

function photosFromFallbackUrls(
  urls: readonly string[],
): readonly OrderPhoto[] {
  return [...new Set(urls.map(normalizeFreightUrl))].map((src) => ({
    src,
    name: photoNameFromUrl(src),
  }));
}

function getFallbackCargoPhotos(): readonly OrderPhoto[] {
  if (!isStringArray(alisonScrapedData)) {
    throw new Error("Invalid alison_scraped_data.json fallback");
  }

  return photosFromFallbackUrls(alisonScrapedData);
}

function findJsonStringEnd(source: string, valueStart: number): number {
  return source
    .slice(valueStart)
    .split("")
    .reduce(
      (state, char) => {
        if (state.done) {
          return state;
        }

        if (state.escaped) {
          return {
            escaped: false,
            done: false,
            end: state.end + 1,
          };
        }

        if (char === "\\") {
          return {
            escaped: true,
            done: false,
            end: state.end + 1,
          };
        }

        if (char === '"') {
          return {
            escaped: false,
            done: true,
            end: state.end,
          };
        }

        return {
          escaped: false,
          done: false,
          end: state.end + 1,
        };
      },
      { escaped: false, done: false, end: valueStart },
    ).end;
}

function extractJsonStringValue(
  source: string,
  marker: string,
): string | undefined {
  const start = source.indexOf(marker);
  if (start === -1) {
    return undefined;
  }

  const valueStart = start + marker.length;
  const valueEnd = findJsonStringEnd(source, valueStart);

  try {
    return JSON.parse(`"${source.slice(valueStart, valueEnd)}"`);
  } catch {
    return undefined;
  }
}

function buildMediaCatalog(
  html: string,
): ReadonlyMap<string, { name: string; width: number; height: number }> {
  const catalog = new Map<
    string,
    { name: string; width: number; height: number }
  >();

  const patterns = [
    /"name":"([^"]+)","hash":"([A-Za-z0-9]+)","width":(\d+),"height":(\d+)/g,
    /"name":"([^"]+)","display_name":(?:null|"[^"]*"),"hash":"([A-Za-z0-9]+)","width":(\d+),"height":(\d+)/g,
  ] as const;

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const name = match[1];
      const hash = match[2];
      const width = Number(match[3]);
      const height = Number(match[4]);

      if (
        !name ||
        !hash ||
        !Number.isFinite(width) ||
        !Number.isFinite(height) ||
        catalog.has(hash)
      ) {
        continue;
      }

      catalog.set(hash, { name, width, height });
    }
  }

  return catalog;
}

function extractElementInnerHtml(
  source: string,
  id: string,
): string | undefined {
  const openMatch = new RegExp(
    `<([a-zA-Z0-9-]+)\\b[^>]*\\bid=["']${id}["'][^>]*>`,
    "i",
  ).exec(source);

  if (!openMatch?.[1] || openMatch.index === undefined) {
    return undefined;
  }

  const tagName = openMatch[1];
  const innerStart = openMatch.index + openMatch[0].length;
  const tokens = [
    ...source
      .slice(innerStart)
      .matchAll(new RegExp(`<${tagName}\\b|</${tagName}\\s*>`, "gi")),
  ];

  const closeOffset = tokens.reduce(
    (state, token) => {
      if (state.done || token.index === undefined) {
        return state;
      }

      const depth = state.depth + (token[0].startsWith("</") ? -1 : 1);
      if (depth === 0) {
        return { depth, done: true, end: token.index };
      }

      return { depth, done: false, end: -1 };
    },
    { depth: 1, done: false, end: -1 },
  );

  if (!closeOffset.done) {
    return undefined;
  }

  return source.slice(innerStart, innerStart + closeOffset.end);
}

function extractOrderFormListHtml(html: string): string {
  // Use the rendered markup first — this is what appears in View Source.
  const renderedList = extractElementInnerHtml(html, ORDER_FORM_LIST_ID);
  if (renderedList !== undefined) {
    return renderedList;
  }

  const pageContent = extractJsonStringValue(
    html,
    `"purl":"${CARGO_PAGE_PURL}","page_type":"page","content":"`,
  );

  if (pageContent) {
    const embeddedList = extractElementInnerHtml(
      pageContent,
      ORDER_FORM_LIST_ID,
    );
    if (embeddedList !== undefined) {
      return embeddedList;
    }
  }

  throw new Error(`Cargo element id="${ORDER_FORM_LIST_ID}" not found`);
}

function extractPageMediaHashes(html: string): readonly string[] {
  const listHtml = extractOrderFormListHtml(html);

  return [
    ...listHtml.matchAll(/<media-item\b[^>]*\bhash=["']([A-Za-z0-9]+)["']/gi),
  ].flatMap((match) => {
    const hash = match[1];
    return hash ? [hash] : [];
  });
}

function toFreightUrl(hash: string, name: string): string {
  return `https://freight.cargo.site/w/${CARGO_FREIGHT_WIDTH}/i/${hash}/${name}`;
}

async function scrapeCargoAlbumPhotos(): Promise<readonly OrderPhoto[]> {
  const response = await fetch(CARGO_PAGE_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: {
      Accept: "text/html",
      "User-Agent": "my-site-7-order-form/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Cargo page request failed with status ${response.status}`);
  }

  const html = await response.text();
  const catalog = buildMediaCatalog(html);
  const hashes = extractPageMediaHashes(html);

  return hashes.flatMap((hash) => {
    const media = catalog.get(hash);
    if (!media) {
      return [];
    }

    return [
      {
        src: toFreightUrl(hash, media.name),
        name: media.name,
      },
    ];
  });
}

export async function getCargoAlbumPhotos(): Promise<readonly OrderPhoto[]> {
  try {
    const photos = await scrapeCargoAlbumPhotos();
    if (photos.length > 0) {
      return photos;
    }
  } catch (error) {
    if (!USE_CARGO_JSON_FALLBACK) {
      throw error;
    }
    console.error("Cargo scrape failed; using alison_scraped_data.json", error);
  }

  if (!USE_CARGO_JSON_FALLBACK) {
    throw new Error("Cargo scrape returned no photos");
  }

  return getFallbackCargoPhotos();
}
