import { Box, Container } from "@mui/material";
import A2Logo from "@/components/A2Logo";
import FancyLink from "@/components/FancyLink";

export const metadata = {
  title: "A²",
};

export default function A2Home() {
  return (
    <Box
      data-page="a2-home"
      sx={{
        minHeight: "100%",
        background: "rgba(176, 120, 220, 0.38)",
      }}
    >
      <Container
        sx={{
          height: "100%",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "fit-content",
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              mb: 2,
              width: "fit-content",
              maxWidth: "100%",
              alignSelf: "center",
            }}
          >
            <A2Logo height="clamp(4.5rem, 22vw, 9rem)" />
          </Box>
          <FancyLink href="/a2/order-form" title="Order Form" />
        </Box>
      </Container>
    </Box>
  );
}
