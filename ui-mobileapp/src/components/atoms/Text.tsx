import styled, { css } from "styled-components/native";
import { fonts } from "../../theme/fonts";
import theme from "../../theme/theme";

import { Colors, getColors } from "../../theme/utils";

export type Weights = keyof typeof fonts.weight;
export type Sizes = keyof typeof fonts.sizes;

export type TextProps = {
  color?: Colors;
  weight?: Weights;
  size?: Sizes;
};

// BASIC TEXT

export const Text = styled.Text<TextProps>`
  color: ${({ color }) =>
    (color && getColors(color)) || theme.colors.grey[900]};

  font-size: ${({ theme, size }) =>
    size ? theme.fonts.sizes[size] : theme.fonts.sizes.md};
  font-family: ${({ theme, weight }) =>
    weight ? theme.fonts.weight[weight] : theme.fonts.weight.regular};
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
    (color && getColors(color)) || theme.colors.grey[900]};
  font-family: ${({ theme, weight }) =>
    weight ? theme.fonts.weight[weight] : theme.fonts.weight.semiBold};

  ${({ variant }) => variantsStyles[variant]};
`;
