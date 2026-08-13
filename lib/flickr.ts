const FLICKR_REST_URL = "https://api.flickr.com/services/rest/";
const FLICKR_USER_ID = process.env.FLICKR_USER_ID ?? "145898776@N04";
const PHOTOS_PER_PAGE = 500;
const REVALIDATE_SECONDS = 3600;
const GALLERY_MAX_WIDTH = 2048;

export type PhotoSort = "newest" | "oldest" | "random";

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  srcSet: readonly GallerySource[];
  dateTaken: string;
  dateTakenGranularity: number;
  flickrUrl: string;
}

export interface GallerySource {
  src: string;
  width: number;
  height: number;
}

export interface FlickrGallery {
  photos: readonly GalleryImage[];
  slides: readonly GalleryImage[];
}

interface FlickrPhoto {
  id: string;
  title?: string;
  datetaken?: string;
  datetakengranularity?: string | number;
  url_z?: string;
  width_z?: string | number;
  height_z?: string | number;
  url_c?: string;
  width_c?: string | number;
  height_c?: string | number;
  url_l?: string;
  width_l?: string | number;
  height_l?: string | number;
  url_h?: string;
  width_h?: string | number;
  height_h?: string | number;
  url_k?: string;
  width_k?: string | number;
  height_k?: string | number;
  url_o?: string;
  width_o?: string | number;
  height_o?: string | number;
}

interface FlickrPhotosPage {
  page: number;
  pages: number;
  photo: unknown[];
}

interface FlickrPhotosResponse {
  stat: string;
  message?: string;
  photos?: FlickrPhotosPage;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFlickrPhoto(value: unknown): value is FlickrPhoto {
  return isRecord(value) && typeof value.id === "string";
}

function isFlickrPhotosResponse(value: unknown): value is FlickrPhotosResponse {
  if (!isRecord(value) || typeof value.stat !== "string") {
    return false;
  }

  if (value.photos === undefined) {
    return true;
  }

  return (
    isRecord(value.photos) &&
    typeof value.photos.page === "number" &&
    typeof value.photos.pages === "number" &&
    Array.isArray(value.photos.photo)
  );
}

function getApiKey(): string {
  const apiKey = process.env.FLICKR_API_KEY;

  if (!apiKey) {
    throw new Error("FLICKR_API_KEY is not set");
  }

  return apiKey;
}

function getPhotosPage(response: FlickrPhotosResponse): FlickrPhotosPage {
  if (response.stat !== "ok" || response.photos === undefined) {
    throw new Error(response.message ?? "Flickr request failed");
  }

  return response.photos;
}

export function getFlickrPhotoUrl(photoId: string): string {
  return `https://www.flickr.com/photos/${FLICKR_USER_ID}/${photoId}/`;
}

function parseDateTaken(value: string | undefined): string {
  return value?.trim() ?? "";
}

function parseDateTakenGranularity(
  value: string | number | undefined,
): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatDateTaken(
  dateTaken: string,
  granularity: number,
): string | undefined {
  const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?/.exec(dateTaken);

  if (!match) {
    return undefined;
  }

  const year = match[1];
  const month = match[2];
  const day = match[3];

  if (!year) {
    return undefined;
  }

  if (granularity >= 8) {
    return `Circa ${year}`;
  }

  if (granularity >= 6 || !month) {
    return year;
  }

  const monthIndex = Number(month) - 1;

  if (!Number.isFinite(monthIndex) || monthIndex < 0 || monthIndex > 11) {
    return year;
  }

  if (granularity >= 4 || !day) {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(Number(year), monthIndex, 1)));
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(Number(year), monthIndex, Number(day))));
}

export function parsePhotoSort(
  value: string | string[] | undefined,
): PhotoSort {
  const sort = Array.isArray(value) ? value[0] : value;

  if (sort === "oldest" || sort === "random" || sort === "newest") {
    return sort;
  }

  return "newest";
}

function shuffleIndices(indices: readonly number[]): readonly number[] {
  return indices
    .map((index) => ({ index, rank: Math.random() }))
    .toSorted((left, right) => left.rank - right.rank)
    .map(({ index }) => index);
}

function sortIndicesByDate(
  photos: readonly GalleryImage[],
  sort: "newest" | "oldest",
): readonly number[] {
  const direction = sort === "newest" ? -1 : 1;

  return photos
    .map((photo, index) => ({ index, dateTaken: photo.dateTaken }))
    .toSorted((left, right) => {
      if (!left.dateTaken && !right.dateTaken) {
        return 0;
      }

      if (!left.dateTaken) {
        return 1;
      }

      if (!right.dateTaken) {
        return -1;
      }

      return direction * left.dateTaken.localeCompare(right.dateTaken);
    })
    .map(({ index }) => index);
}

export function sortGallery(
  gallery: FlickrGallery,
  sort: PhotoSort,
): FlickrGallery {
  const length = Math.min(gallery.photos.length, gallery.slides.length);
  const indices = Array.from({ length }, (_, index) => index);
  const ordered =
    sort === "random"
      ? shuffleIndices(indices)
      : sortIndicesByDate(gallery.photos.slice(0, length), sort);

  return {
    photos: ordered.flatMap((index) => {
      const photo = gallery.photos[index];
      return photo ? [photo] : [];
    }),
    slides: ordered.flatMap((index) => {
      const slide = gallery.slides[index];
      return slide ? [slide] : [];
    }),
  };
}

function toSource(
  src: string | undefined,
  width: string | number | undefined,
  height: string | number | undefined,
): GallerySource | undefined {
  if (!src || width === undefined || height === undefined) {
    return undefined;
  }

  const parsedWidth = Number(width);
  const parsedHeight = Number(height);

  if (
    !Number.isFinite(parsedWidth) ||
    !Number.isFinite(parsedHeight) ||
    parsedWidth <= 0 ||
    parsedHeight <= 0
  ) {
    return undefined;
  }

  return { src, width: parsedWidth, height: parsedHeight };
}

function getPhotoSources(photo: FlickrPhoto): readonly GallerySource[] {
  return [
    toSource(photo.url_z, photo.width_z, photo.height_z),
    toSource(photo.url_c, photo.width_c, photo.height_c),
    toSource(photo.url_l, photo.width_l, photo.height_l),
    toSource(photo.url_h, photo.width_h, photo.height_h),
    toSource(photo.url_k, photo.width_k, photo.height_k),
    toSource(photo.url_o, photo.width_o, photo.height_o),
  ].filter((source) => source !== undefined);
}

function pickGallerySource(
  sources: readonly GallerySource[],
): GallerySource | undefined {
  const withinLimit = sources.filter(
    (source) => source.width <= GALLERY_MAX_WIDTH,
  );

  if (withinLimit.length > 0) {
    return withinLimit[withinLimit.length - 1];
  }

  return sources[0];
}

function toGalleryImage(photo: FlickrPhoto): GalleryImage | undefined {
  const sources = getPhotoSources(photo);

  if (sources.length === 0) {
    return undefined;
  }

  const gallerySource = pickGallerySource(sources);
  const lightboxSource = sources[sources.length - 1];

  if (!gallerySource || !lightboxSource) {
    return undefined;
  }

  const gallerySrcSet = sources.filter(
    (source) => source.width <= GALLERY_MAX_WIDTH,
  );

  return {
    src: gallerySource.src,
    width: gallerySource.width,
    height: gallerySource.height,
    alt: photo.title?.trim() || "Photograph",
    srcSet: gallerySrcSet.length > 0 ? gallerySrcSet : sources,
    dateTaken: parseDateTaken(photo.datetaken),
    dateTakenGranularity: parseDateTakenGranularity(
      photo.datetakengranularity,
    ),
    flickrUrl: getFlickrPhotoUrl(photo.id),
  };
}

function toLightboxSlide(photo: FlickrPhoto): GalleryImage | undefined {
  const sources = getPhotoSources(photo);

  if (sources.length === 0) {
    return undefined;
  }

  const lightboxSource = sources[sources.length - 1];

  if (!lightboxSource) {
    return undefined;
  }

  return {
    src: lightboxSource.src,
    width: lightboxSource.width,
    height: lightboxSource.height,
    alt: photo.title?.trim() || "Photograph",
    srcSet: sources,
    dateTaken: parseDateTaken(photo.datetaken),
    dateTakenGranularity: parseDateTakenGranularity(
      photo.datetakengranularity,
    ),
    flickrUrl: getFlickrPhotoUrl(photo.id),
  };
}

async function fetchFlickrPage(page: number): Promise<FlickrPhotosPage> {
  const params = new URLSearchParams({
    method: "flickr.people.getPublicPhotos",
    api_key: getApiKey(),
    user_id: FLICKR_USER_ID,
    extras: "date_taken,url_z,url_c,url_l,url_h,url_k,url_o",
    per_page: String(PHOTOS_PER_PAGE),
    page: String(page),
    format: "json",
    nojsoncallback: "1",
  });

  const response = await fetch(`${FLICKR_REST_URL}?${params.toString()}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Flickr request failed with status ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!isFlickrPhotosResponse(payload)) {
    throw new Error("Unexpected Flickr response");
  }

  return getPhotosPage(payload);
}

export async function getFlickrGallery(): Promise<FlickrGallery> {
  const firstPage = await fetchFlickrPage(1);
  const remainingPageNumbers = Array.from(
    { length: Math.max(firstPage.pages - 1, 0) },
    (_, index) => index + 2,
  );
  const remainingPages = await Promise.all(
    remainingPageNumbers.map(fetchFlickrPage),
  );
  const flickrPhotos = [
    ...firstPage.photo,
    ...remainingPages.flatMap((page) => page.photo),
  ].filter(isFlickrPhoto);

  return {
    photos: flickrPhotos.flatMap((photo) => {
      const image = toGalleryImage(photo);
      return image ? [image] : [];
    }),
    slides: flickrPhotos.flatMap((photo) => {
      const slide = toLightboxSlide(photo);
      return slide ? [slide] : [];
    }),
  };
}
