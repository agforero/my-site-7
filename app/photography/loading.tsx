import { Container, Typography } from "@mui/material";

export default function PhotographyLoading() {
  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Typography sx={{ mt: 2 }}>Loading photos...</Typography>
    </Container>
  );
}
