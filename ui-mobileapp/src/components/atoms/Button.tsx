import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components/native";

import { PressableProps } from "react-native";
import { FlattenSimpleInterpolation } from "styled-components";
import { Text } from "./Text";
import theme from "../../theme/theme";

export type ButtonColor = "neutral" | "primary";
export type ButtonVariant = "default" | "outline" | "ghost";

export type ColorVariables = {
  background: string;
  text: string;
  //   disabled?: string;
  border: string;
};

export type ButtonProps = PropsWithChildren<
  {
    variant?: ButtonVariant;
    color?: ButtonColor;
  } & PressableProps
>;

// TODO: add isLoading and disabled states?
export default function Button({
  variant,
  color,
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton variant={variant} color={color} {...rest}>
      {children}
    </StyledButton>
  );
}

export const getColors = (variables: ColorVariables) => css`
  --background-color: ${variables.background};
  /* TODO: add light background when we have all the shades of our colors */
  /* --light-background-color: */
  --text-color: ${variables.text};
  --border-color: ${variables.border};
`;

const styleColor: { [key in ButtonColor]: FlattenSimpleInterpolation } = {
  neutral: getColors({
    background: theme.colors.black[500],
    text: theme.colors.white[500],
    border: theme.colors.black[500],
  }),

  primary: getColors({
    background: theme.colors.primary[500],
    text: theme.colors.white[500],
    border: theme.colors.primary[500],
  }),
};

const styleVariant: { [key in ButtonVariant]: FlattenSimpleInterpolation } = {
  default: css`
    border: 1px solid transparent;
    background-color: var(--background-color);
    color: var(--text-color);
  `,

  outline: css`
    border: 1px solid;
    border-color: var(--border-color);
    /* TODO: replace transparent to --light-background-color css var */
    background-color: transparent;
    color: var(--background-color);
  `,

  ghost: css`
    border: 1px solid transparent;
    background: transparent;
    color: var(--background-color);
    /* NOTE: maybe remove the padding for this variant */
  `,
};

type StyledButtonProps = Pick<ButtonProps, "variant" | "color">;

// NOTE: React Native's <Button /> component does not accept a style prop
//       so we use Pressable tag.
const StyledButton = styled.Pressable<StyledButtonProps>`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: 1.5rem 2.25rem;
  font-family: inherit;

  ${({ color }) => (color ? styleColor[color] : styleColor.primary)};
  ${({ variant }) => (variant ? styleVariant[variant] : styleVariant.default)};
`;
