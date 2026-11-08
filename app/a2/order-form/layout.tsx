import { Box } from "@mui/material";

export default function OrderFormLayout({
  children,
}: LayoutProps<"/a2/order-form">) {
  return (
    <Box
      data-page="order-form"
      sx={{
        minHeight: "100%",
        bgcolor: "#000",
      }}
    >
      {children}
    </Box>
  );
}
