import styled from "styled-components/native";
import { fonts } from "../../theme/fonts";

import { Colors, getColors } from "../../theme/utils";

// TODO: add all font weigth
export type Weights = "regular";
export type Sizes = keyof typeof fonts.sizes;

export type TextProps = {
  color?: Colors;
  weight?: Weights;
  size?: Sizes;
};

// TODO: add this function to utils file
function getColors(color: Colors) {
  switch (color) {
    case "black":
      return theme.colors.grey[900];
    case "primary":
      return theme.colors.primary[500];
    case "secondary":
      return theme.colors.secondary[500];
  }
}

export const Text = styled.Text<TextProps>`
  color: ${({ color }) => (color && getColors(color)) || "inherit"};
  font-weight: ${({ theme, weight }) =>
    weight ? theme.fonts.weight[weight] : theme.fonts.weight.regular};
`;
