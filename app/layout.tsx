import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Young_Serif } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import "./globals.css";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-young-serif",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Agustin Forero",
  description: "Agustin Forero's personal website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${youngSerif.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body
        className="h-full w-full flex flex-col"
        style={{ backgroundColor: "#FFF9E5" }}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
