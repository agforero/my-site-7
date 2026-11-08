import { Box, Container, Typography } from "@mui/material";
import A2Logo from "@/components/A2Logo";
import PageHeader from "@/components/PageHeader";

export default function OrderFormLoading() {
  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ py: 1, mb: 2 }}>
        <PageHeader
          title="Order Form"
          xsTitle="Order"
          theme="dark"
          brand="A²"
          brandLogo={<A2Logo height={28} tone="white" />}
          homeHref="/a2"
        />
      </Box>
      <Typography sx={{ color: "#bbb" }}>Loading photos…</Typography>
    </Container>
  );
}
