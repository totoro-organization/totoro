import styled from "styled-components/native";
import { fonts } from "../../theme/fonts";

export type Colors = "neutral" | "primary";
// TODO: add all font weigth
export type Weights = "regular";
export type Sizes = keyof typeof fonts.sizes;

export type TextProps = {
  color?: Colors;
  weight?: Weights;
  size?: Sizes;
};

export const Text = styled.Text<TextProps>`
  color: ${({ theme, color }) =>
    color === "primary" ? theme.colors.primary[500] : theme.colors.black[500]};
  font-weight: ${({ theme, weight }) =>
    weight ? theme.fonts.weight[weight] : theme.fonts.weight.regular};
`;
