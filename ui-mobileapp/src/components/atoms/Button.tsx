import React, { PropsWithChildren, useState } from "react";
import styled, { css } from "styled-components/native";

import { PressableProps } from "react-native";
import { FlattenSimpleInterpolation } from "styled-components";
import { Text } from "./Text";
import theme from "../../theme/theme";
import Spinner from "./Spinner";

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
    handlePress?: () => void | Promise<void> | unknown;
  } & PressableProps
>;

// TODO: add isLoading and disabled states?
export default function Button({
  variant,
  color,
  children,
  handlePress,
  ...rest
}: ButtonProps) {
  const [isInternalLoading, setIsInternalLoading] = useState(false);

  async function onButtonPress() {
    setIsInternalLoading(true);

    try {
      if (handlePress) return await handlePress();
    } catch (err) {
      console.error(err);
    } finally {
      setIsInternalLoading(false);
    }
  }

  return (
    <StyledButton
      variant={variant}
      color={color}
      onPress={handlePress && onButtonPress}
      {...rest}
    >
      {isInternalLoading && (
        <LoadingWrapper>
          <Spinner size={2} />
        </LoadingWrapper>
      )}

      {React.Children.map(children, (child) => {
        if (typeof child === "string") {
          return <StyledText $isHidden={isInternalLoading}>{child}</StyledText>;
        }
        return <Element $isHidden={isInternalLoading}>{child}</Element>;
      })}
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
    color: var(--border-color);
  `,

  ghost: css`
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-color);
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
  ${({ variant }) => (variant ? styleVariant[variant] : styleVariant.default)};
  ${({ color }) => (color ? styleColor[color] : styleColor.primary)};
`;

const LoadingWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const buttonContentStyle = css<{ $isHidden: boolean }>`
  opacity: ${({ $isHidden }) => ($isHidden ? "0" : "1")};
`;

const StyledText = styled(Text)<{ $isHidden: boolean }>`
  ${buttonContentStyle};
`;

const Element = styled.View<{ $isHidden: boolean }>`
  display: grid;
  place-items: center;
  ${buttonContentStyle};
`;
