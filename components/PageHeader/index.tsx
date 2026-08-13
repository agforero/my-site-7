import { Box, Typography } from "@mui/material";
import DrawnBorder from "../DrawnBorder";
import Link from "next/link";

export default function PageHeader({
  title,
  theme = "light",
}: {
  title: string;
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
      <span
        style={{ color: theme === "light" ? "#000" : "#fff", padding: "0 8px" }}
      >
        {title}
      </span>
    </Typography>
  );
}
