import { Box, Container, Typography } from "@mui/material";
import PhotoGallery from "@/components/PhotoGallery";
import SortButtonGroup from "@/components/SortButtonGroup";
import { getFlickrGallery, parsePhotoSort, sortGallery } from "@/lib/flickr";
import Link from "next/link";
import DrawnBorder from "@/components/DrawnBorder";

export const revalidate = 3600;

export const metadata = {
  title: "Photography",
};

export default async function PhotographyPage({
  searchParams,
}: PageProps<"/photography">) {
  const { sort: sortParam } = await searchParams;
  const sort = parsePhotoSort(sortParam);
  const { photos, slides } = sortGallery(await getFlickrGallery(), sort);

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "#000",
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#bbb", display: "flex", alignItems: "center", gap: 1 }}
        >
          <DrawnBorder>
            <Box
              component="span"
              sx={{ px: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link href="/">Agustin Forero</Link>
            </Box>
            <Box
              component="span"
              sx={{ px: 1, display: { xs: "block", sm: "none" } }}
            >
              <Link href="/">AGF</Link>
            </Box>
          </DrawnBorder>
          /<span style={{ color: "#fff", padding: "0 8px" }}>Photography</span>
        </Typography>
        <SortButtonGroup sort={sort} />
      </Box>
      {photos.length === 0 ? (
        <Typography>No public photos found.</Typography>
      ) : (
        <PhotoGallery photos={photos} slides={slides} />
      )}
    </Container>
  );
}
