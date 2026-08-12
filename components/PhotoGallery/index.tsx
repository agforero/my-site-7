"use client";

import { useState } from "react";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox, {
  cssClass,
  useLightboxState,
  type Slide,
} from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { GalleryImage } from "@/lib/flickr";

interface PhotoGalleryProps {
  photos: readonly GalleryImage[];
  slides: readonly GalleryImage[];
}

const DATE_FOOTER_FONT_SIZE = "1rem";
const DATE_FOOTER_LINE_HEIGHT = 1.3;
const DATE_FOOTER_PADDING_Y = "0.25rem";
const DATE_FOOTER_HEIGHT = `calc(${DATE_FOOTER_FONT_SIZE} * ${DATE_FOOTER_LINE_HEIGHT} + ${DATE_FOOTER_PADDING_Y} * 2)`;

function readFlickrUrl(slide: Slide | undefined): string | undefined {
  if (!slide || !("flickrUrl" in slide)) {
    return undefined;
  }

  const { flickrUrl } = slide;
  return typeof flickrUrl === "string" ? flickrUrl : undefined;
}

function formatUploadDate(timestamp: number): string | undefined {
  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return undefined;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp * 1000));
}

function readUploadDate(slide: Slide | undefined): string | undefined {
  if (!slide || !("dateUpload" in slide)) {
    return undefined;
  }

  const { dateUpload } = slide;
  return typeof dateUpload === "number"
    ? formatUploadDate(dateUpload)
    : undefined;
}

function readPhotoTitle(slide: Slide | undefined): string | undefined {
  if (!slide || typeof slide.alt !== "string") {
    return undefined;
  }

  const title = slide.alt.trim();
  return title.length > 0 ? title : undefined;
}

function FlickrLinkButton() {
  const { currentSlide } = useLightboxState();
  const flickrUrl = readFlickrUrl(currentSlide);

  if (!flickrUrl) {
    return null;
  }

  return (
    <a
      href={flickrUrl}
      target="_blank"
      rel="noreferrer"
      title="View on Flickr"
      aria-label="View on Flickr"
      className={cssClass("button")}
    >
      <OpenInNew className={cssClass("icon")} fontSize="small" />
    </a>
  );
}

export default function PhotoGallery({ photos, slides }: PhotoGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return null;
  }

  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={280}
        spacing={8}
        defaultContainerWidth={1200}
        onClick={({ index: photoIndex }) => {
          setIndex(photoIndex);
        }}
      />
      <Lightbox
        open={index !== null}
        index={index ?? 0}
        close={() => {
          setIndex(null);
        }}
        slides={[...slides]}
        plugins={[Zoom]}
        toolbar={{
          buttons: [
            <FlickrLinkButton key="flickr" />,
            "zoom",
            "close",
          ],
        }}
        styles={{
          slide: {
            paddingBottom: DATE_FOOTER_HEIGHT,
          },
        }}
        render={{
          slideFooter: ({ slide }) => {
            const title = readPhotoTitle(slide);
            const uploadedOn = readUploadDate(slide);

            if (!title && !uploadedOn) {
              return null;
            }

            return (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#000",
                  color: "#fff",
                  fontSize: DATE_FOOTER_FONT_SIZE,
                  lineHeight: DATE_FOOTER_LINE_HEIGHT,
                  paddingBlock: DATE_FOOTER_PADDING_Y,
                  paddingInline: "0.75rem",
                  fontFamily: "var(--font-averia-serif-libre), serif",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                    maxWidth: "100%",
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {title}
                  </span>
                  <span style={{ flexShrink: 0, color: "#bbb" }}>
                    {uploadedOn}
                  </span>
                </div>
              </div>
            );
          },
        }}
      />
    </>
  );
}
