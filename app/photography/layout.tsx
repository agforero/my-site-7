import { Box } from "@mui/material";

export default function PhotographyLayout({
  children,
}: LayoutProps<"/photography">) {
  return (
    <Box
      data-page="photography"
      sx={{
        minHeight: "100%",
        bgcolor: "#000",
      }}
    >
      {children}
    </Box>
  );
}
