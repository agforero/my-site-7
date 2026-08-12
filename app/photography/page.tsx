import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import PhotoGallery from "@/components/PhotoGallery";
import { getFlickrGallery } from "@/lib/flickr";

export const revalidate = 3600;

export const metadata = {
  title: "Photography",
};

export default async function PhotographyPage() {
  const { photos, slides } = await getFlickrGallery();

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="body1" sx={{ display: "inline-block", mb: 2 }}>
            ← Agustin Forero
          </Typography>
        </Link>
        <Typography variant="h1">Photography</Typography>
      </Box>
      {photos.length === 0 ? (
        <Typography>No public photos found.</Typography>
      ) : (
        <PhotoGallery photos={photos} slides={slides} />
      )}
    </Container>
  );
}
