import { Box, Container, Typography } from "@mui/material";
import A2Logo from "@/components/A2Logo";
import OrderGallery from "@/components/OrderGallery";
import PageHeader from "@/components/PageHeader";
import { getShuffledOrderPhotos } from "@/lib/orderForm";

export const revalidate = 3600;

export const metadata = {
  title: "Order Form · A²",
};

export default async function OrderFormPage() {
  const photos = await getShuffledOrderPhotos();

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "#000",
          py: 1,
          mb: 2,
        }}
      >
        <PageHeader
          title="Order Form"
          xsTitle="Order"
          theme="dark"
          brand="A²"
          brandLogo={<A2Logo height={28} tone="white" />}
          homeHref="/a2"
        />
        <Typography sx={{ color: "#888", mt: 1, fontSize: "0.95rem" }}>
          Click a photo to open the order form.
        </Typography>
      </Box>
      <OrderGallery photos={photos} />
    </Container>
  );
}
