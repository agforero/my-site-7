import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ArrowForward from "@mui/icons-material/ArrowForward";
import DrawnBorder from "@/components/DrawnBorder";

interface FancyLinkProps {
  href: string;
  title: string;
}

export default function FancyLink({ href, title }: FancyLinkProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <DrawnBorder
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
        }}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box>
          <ArrowForward />
        </Box>
      </DrawnBorder>
    </Link>
  );
}
