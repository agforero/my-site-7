"use client";

import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Shuffle from "@mui/icons-material/Shuffle";
import { useRouter } from "next/navigation";
import type { PhotoSort } from "@/lib/flickr";

interface SortButtonGroupProps {
  sort: PhotoSort;
}

export default function SortButtonGroup({ sort }: SortButtonGroupProps) {
  const router = useRouter();

  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={sort}
      aria-label="Photo sort"
      onChange={(_, value) => {
        if (value !== "newest" && value !== "oldest" && value !== "random") {
          return;
        }

        router.push(`/photography?sort=${value}`, { scroll: false });
      }}
      sx={{
        "& .MuiToggleButton-root": {
          color: "#bbb",
          borderColor: "#444",
          "&:hover": {
            backgroundColor: "#2a2a2a",
          },
        },
        "& .MuiToggleButton-root.Mui-selected": {
          color: "#fff",
          backgroundColor: "#333",
          "&:hover": {
            backgroundColor: "#3a3a3a",
          },
        },
      }}
    >
      <Tooltip title="Newest first">
        <ToggleButton value="newest" aria-label="Newest first">
          <ArrowDownward fontSize="small" />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Oldest first">
        <ToggleButton value="oldest" aria-label="Oldest first">
          <ArrowUpward fontSize="small" />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Random">
        <ToggleButton value="random" aria-label="Random order">
          <Shuffle fontSize="small" />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
