"use client";

import { createTheme } from "@mui/material/styles";

const headingFont = "var(--font-young-serif), serif";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
    h1: { fontFamily: headingFont },
    h2: { fontFamily: headingFont },
    h3: { fontFamily: headingFont },
    h4: { fontFamily: headingFont },
    h5: { fontFamily: headingFont },
    h6: { fontFamily: headingFont },
  },
});

export default theme;
