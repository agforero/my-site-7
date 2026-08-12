import { Box, Container, Typography } from "@mui/material";
import FancyLink from "@/components/FancyLink";

export default function Home() {
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Agustin Forero
        </Typography>
        <FancyLink href="/resume" title="Resume" />
        <FancyLink href="/photography" title="Photography" />
      </Box>
    </Container>
  );
}
