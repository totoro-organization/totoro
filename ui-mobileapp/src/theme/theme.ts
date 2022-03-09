import { colors } from "./colors";
import { fonts } from "./fonts";
import { border } from "./border";

export type Theme = typeof theme;

const theme = {
  colors,
  fonts,
  border,
};

export default theme;
