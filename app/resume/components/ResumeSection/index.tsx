import { Box, Divider, Typography } from "@mui/material";

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

export default function ResumeSection({ title, items }: ResumeSectionProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="body1">--</Typography>
      <Typography variant="body1">{title}</Typography>
      {items.map((item) => (
        <Typography key={item.title} variant="body2">
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
          {item.description && (
            <Box component="span">{` / ${item.description}`}</Box>
          )}
          {item.date && <Box component="span">{`, ${item.date}`}</Box>}
        </Typography>
      ))}
    </Box>
  );
}
