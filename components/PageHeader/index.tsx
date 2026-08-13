import { Box, Typography } from "@mui/material";
import DrawnBorder from "../DrawnBorder";
import Link from "next/link";

export default function PageHeader({
  title,
  theme = "light",
  xsTitle,
}: {
  title: string;
  xsTitle?: string;
  theme?: "light" | "dark";
}) {
  return (
    <Typography
      variant="h6"
      sx={{
        color: theme === "light" ? "#666" : "#bbb",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
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
      /
      <Box
        component="span"
        sx={{
          color: theme === "light" ? "#000" : "#fff",
          px: 1,
          display: { xs: "none", sm: "block" },
        }}
      >
        {title}
      </Box>
      <Box
        component="span"
        sx={{
          color: theme === "light" ? "#000" : "#fff",
          px: 1,
          display: { xs: "block", sm: "none" },
        }}
      >
        {xsTitle || title}
      </Box>
    </Typography>
  );
}
