import { createTheme, useMediaQuery } from "@mui/material";

export function useIsMobile(): boolean {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile;
}
