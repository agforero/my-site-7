import { Box, Typography } from "@mui/material";
import DrawnBorder from "../DrawnBorder";
import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHeader({
  title,
  theme = "light",
  xsTitle,
  brand = "Agustin Forero",
  brandShort = "AGF",
  brandLogo,
  homeHref = "/",
}: {
  title: string;
  xsTitle?: string;
  theme?: "light" | "dark";
  brand?: string;
  brandShort?: string;
  brandLogo?: ReactNode;
  homeHref?: string;
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
        {brandLogo ? (
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href={homeHref} aria-label={brand}>
              {brandLogo}
            </Link>
          </Box>
        ) : (
          <>
            <Box
              component="span"
              sx={{ px: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link href={homeHref}>{brand}</Link>
            </Box>
            <Box
              component="span"
              sx={{ px: 1, display: { xs: "block", sm: "none" } }}
            >
              <Link href={homeHref}>{brandShort}</Link>
            </Box>
          </>
        )}
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
