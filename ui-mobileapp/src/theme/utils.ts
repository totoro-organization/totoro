import theme from "./theme";

export type ThemeColors = "primary" | "secondary" | "grey";

export type Colors = "black" | "primary" | "white" | "grey";

export function getColors(color: Colors) {
  switch (color) {
    case "black":
      return theme.colors.grey[900];
    case "primary":
      return theme.colors.primary[500];
    case "white":
      return theme.colors.white[600];
    case "grey":
      return theme.colors.grey[500];
  }
}
