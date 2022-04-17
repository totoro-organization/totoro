import theme from "./theme";

export type Colors = "black" | "primary" | "secondary";

export function getColors(color: Colors) {
  switch (color) {
    case "black":
      return theme.colors.grey[900];
    case "primary":
      return theme.colors.primary[500];
    case "secondary":
      return theme.colors.secondary[500];
  }
}
