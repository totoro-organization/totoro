import theme from "./theme";

export type ThemeColors = "primary" | "secondary" | "grey";

export type Colors =
  | "black"
  | "primary"
  | "white"
  | "grey"
  | "info"
  | "success";

export function getColors(color: Colors) {
  switch (color) {
    case "black":
      return theme.colors.core.black.base;
    case "primary":
      return theme.colors.brand.primary.base;
    case "white":
      return theme.colors.core.white.base;
    case "grey":
      // FIXME
      return theme.colors.v1.grey[500];
    case "info":
      return theme.colors.core.info.base;
    case "success":
      return theme.colors.core.success.base;
  }
}
