import { Box, Container, Typography } from "@mui/material";
import PhotoGallery from "@/components/PhotoGallery";
import SortButtonGroup from "@/components/SortButtonGroup";
import { getFlickrGallery, parsePhotoSort, sortGallery } from "@/lib/flickr";
import PageHeader from "@/components/PageHeader";

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
        <PageHeader title="Photography" xsTitle="Photos" theme="dark" />
        <SortButtonGroup sort={sort} />
      </Box>
      {photos.length === 0 ? (
        <Typography>No public photos available.</Typography>
      ) : (
        <PhotoGallery photos={photos} slides={slides} />
      )}
    </Container>
  );
}
