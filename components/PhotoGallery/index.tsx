"use client";

import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { GalleryImage } from "@/lib/flickr";

interface PhotoGalleryProps {
  photos: readonly GalleryImage[];
  slides: readonly GalleryImage[];
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
      />
    </>
  );
}
