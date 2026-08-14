"use client";

import { Box, Typography } from "@mui/material";
import { useSpeakWithClippy } from "@/components/Clippy/useSpeakWithClippy";

interface ResumeItem {
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
}

interface ResumeSectionProps {
  title: string;
  items: ResumeItem[];
}

function ResumeItemLine({ item }: { item: ResumeItem }) {
  const { speak } = useSpeakWithClippy();
  const hasDescription = Boolean(item.description);

  return (
    <Typography
      variant="body1"
      onClick={() => {
        if (item.description) {
          speak(item.description);
        }
      }}
      sx={{
        px: 0.5,
        mx: -0.5,
        borderRadius: 0.5,
        ...(hasDescription ? { cursor: "pointer" } : {}),
        "@media (hover: hover)": {
          "&:hover": {
            backgroundColor: "#F5E6B5",
            outline: "1px solid #000",
          },
        },
      }}
    >
      <Box sx={{ fontWeight: "bold" }} component="span">
        {item.title}
      </Box>
      {item.subtitle && (
        <Box component="span">
          <Box sx={{ fontWeight: "bold" }} component="span">
            :
          </Box>
          {` ${item.subtitle}`}
        </Box>
      )}
      {item.date && <Box component="span">{`, ${item.date}`}</Box>}
    </Typography>
  );
}

export default function ResumeSection({ title, items }: ResumeSectionProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="body1">--</Typography>
      <Typography variant="h6">{title}</Typography>
      {items.map((item) => (
        <ResumeItemLine key={item.title} item={item} />
      ))}
    </Box>
  );
}
