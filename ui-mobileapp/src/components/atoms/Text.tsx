import styled from "styled-components/native";
import { fonts } from "../../theme/fonts";

import { Colors, getColors } from "../../theme/utils";

// TODO: add all font weigth
export type Weights = keyof typeof fonts.weight;
export type Sizes = keyof typeof fonts.sizes;

export type TextProps = {
  color?: Colors;
  weight?: Weights;
  size?: Sizes;
};

export const Text = styled.Text<TextProps>`
  color: ${({ color }) => (color && getColors(color)) || "inherit"};
  font-weight: ${({ theme, weight }) =>
    weight ? theme.fonts.weight[weight] : theme.fonts.weight.regular};
  font-size: ${({ theme, size }) =>
    size ? theme.fonts.sizes[size] : theme.fonts.sizes.md};
  font-family: "Outfit";
`;
