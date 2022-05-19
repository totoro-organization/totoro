import { colors } from "./colors";
import { fonts } from "./fonts";
import { border } from "./border";
import { spacing } from "./spacing";

export type Theme = typeof theme;

const theme = {
  colors,
  fonts,
  border,
  spacing,
};

export default theme;
