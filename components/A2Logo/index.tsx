import { Box } from "@mui/material";

const A2_LOGO_SRC = "/a2_logo.png";

interface A2LogoProps {
  height?: number | string;
  maxWidth?: number | string;
  tone?: "default" | "white";
}

export default function A2Logo({
  height = 28,
  maxWidth,
  tone = "default",
}: A2LogoProps) {
  return (
    <Box
      component="img"
      src={A2_LOGO_SRC}
      alt="A²"
      sx={{
        display: "block",
        height,
        width: "auto",
        maxWidth: maxWidth ?? "100%",
        filter: tone === "white" ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}
