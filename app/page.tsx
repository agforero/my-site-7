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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: "100%" }}>
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            maxWidth: "100%",
            fontSize: "clamp(2.25rem, 11vw, 6rem)",
            lineHeight: 1.15,
          }}
        >
          Agustin Forero
        </Typography>
        <FancyLink href="/resume" title="Resume" />
        <FancyLink href="/photography" title="Photography" />
      </Box>
    </Container>
  );
}
