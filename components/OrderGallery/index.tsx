"use client";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { RowsPhotoAlbum, type Photo } from "react-photo-album";
import "react-photo-album/rows.css";
import type { OrderPhoto } from "@/lib/cargoPhotos";
import { buildOrderFormUrl } from "@/lib/orderFormUrl";

interface OrderGalleryProps {
  photos: readonly OrderPhoto[];
}

interface MeasuredPhoto extends Photo {
  name: string;
}

function measurePhoto(photo: OrderPhoto): Promise<MeasuredPhoto> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => {
      resolve({
        src: photo.src,
        width: image.naturalWidth,
        height: image.naturalHeight,
        alt: photo.name,
        name: photo.name,
      });
    };
    image.onerror = () => {
      reject(new Error(`Failed to load ${photo.src}`));
    };
    image.src = photo.src;
  });
}

export default function OrderGallery({ photos }: OrderGalleryProps) {
  const [measured, setMeasured] = useState<readonly MeasuredPhoto[] | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    void Promise.allSettled(photos.map(measurePhoto)).then((results) => {
      if (cancelled) {
        return;
      }

      const next = results.flatMap((result) =>
        result.status === "fulfilled" ? [result.value] : [],
      );
      setMeasured(next);
    });

    return () => {
      cancelled = true;
    };
  }, [photos]);

  if (measured === null) {
    return <Typography sx={{ color: "#bbb" }}>Loading photos…</Typography>;
  }

  if (measured.length === 0) {
    return (
      <Typography sx={{ color: "#bbb" }}>No photos available.</Typography>
    );
  }

  const albumPhotos = measured.map((photo) => ({
    ...photo,
    href: buildOrderFormUrl(photo.src),
    label: `Order ${photo.name}`,
  }));

  return (
    <RowsPhotoAlbum
      photos={albumPhotos}
      targetRowHeight={280}
      spacing={8}
      defaultContainerWidth={1200}
      componentsProps={{
        link: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }}
    />
  );
}
