import styled, { css } from "styled-components/native";
import { fonts } from "../../theme/fonts";
import theme from "../../theme/theme";

import { Colors, getColors } from "../../theme/utils";

export type Weights = keyof typeof fonts.weight;
export type Sizes = keyof typeof fonts.sizes;
export type TextAlign = "center" | "left" | "right" | "justify";

export type TextProps = {
  color?: Colors;
  weight?: Weights;
  size?: Sizes;
  align?: TextAlign;
  underline?: boolean;
};

// BASIC TEXT

export const Text = styled.Text<TextProps>`
  color: ${({ color }) =>
    (color && getColors(color)) || theme.colors.core.black.base};
  font-size: ${({ theme, size }) =>
    size ? theme.fonts.sizes[size] : theme.fonts.sizes.md};
  font-family: ${({ theme, weight }) =>
    weight ? theme.fonts.weight[weight] : theme.fonts.weight.regular};
  flex-shrink: 1;
  text-align: ${({ align }) => (align ? align : "left")};
  text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
`;

// HEADING (H1/H2... STYLES)

const h1Style = css<HeadingProps>`
  font-size: ${({ theme, size }) =>
    size ? theme.fonts.sizes[size] : theme.fonts.sizes.xl};
`;

export enum Variant {
  h1 = "h1",
}

const variantsStyles = {
  [Variant.h1]: h1Style,
};

export type HeadingProps = TextProps & { variant: keyof typeof Variant };

export const Heading = styled.Text<HeadingProps>`
  color: ${({ color }) =>
    (color && getColors(color)) || theme.colors.core.black.base};
  font-family: ${({ theme, weight }) =>
    weight ? theme.fonts.weight[weight] : theme.fonts.weight.semiBold};
  flex-shrink: 1;

  ${({ variant }) => variantsStyles[variant]};
`;
