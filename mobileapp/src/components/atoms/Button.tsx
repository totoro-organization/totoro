import React, { PropsWithChildren, useState } from "react";
import styled, { css } from "styled-components/native";

import { ActivityIndicator, PressableProps } from "react-native";
import { FlattenSimpleInterpolation } from "styled-components";
import { Text } from "./Text";
import theme from "../../theme/theme";
import { Colors, getColors } from "../../theme/utils";
import Spacer from "./Spacer";

export type ButtonColor = "black" | "primary" | "grey";
export type ButtonVariant = "default" | "outline" | "ghost";
export type ButtonSize = "fullWidth" | "sm";
export type ButtonPosition = "flex-start" | "center" | "flex-end" | "stretch";

export type ButtonProps = PropsWithChildren<
  {
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    horizontalPosition?: ButtonPosition;
    Icon?: JSX.Element;
    handlePress?: () => void | Promise<void> | unknown;
    className?: string;
  } & PressableProps
>;

export default function Button({
  variant = "default",
  size = "fullWidth",
  color = "black",
  horizontalPosition = "flex-start",
  children,
  Icon,
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
    <OuterLayout horizontalPosition={horizontalPosition} size={size}>
      <StyledButton
        size={size}
        variant={variant}
        color={color}
        onPress={handlePress && onButtonPress}
        disabled={isInternalLoading}
        {...rest}
      >
        {isInternalLoading && (
          <LoadingWrapper>
            <ActivityIndicator />
          </LoadingWrapper>
        )}

        {Icon && (
          <>
            {Icon}
            <Spacer axis="horizontal" size={0.5} />
          </>
        )}

        <StyledText
          $isHidden={isInternalLoading}
          variant={variant}
          color={color}
        >
          {children}
        </StyledText>
      </StyledButton>
    </OuterLayout>
  );
}

export type ColorVariables = {
  background: string;
  border: string;
};

function getButtonVariables(variables: ColorVariables) {
  const backgroundColor = variables.background;
  const borderColor = variables.border;

  return [backgroundColor, borderColor];
}

const styleColor: { [key in ButtonColor]: FlattenSimpleInterpolation } = {
  black: getButtonVariables({
    background: theme.colors.core.black.base,
    border: theme.colors.core.black.base,
  }),

  primary: getButtonVariables({
    background: theme.colors.brand.primary.base,
    border: theme.colors.brand.primary.base,
  }),

  grey: getButtonVariables({
    background: theme.colors.v1.grey[300],
    border: theme.colors.v1.grey[300],
  }),
};

function getButtonStyles(variant: ButtonVariant, color: ButtonColor) {
  if (variant === "default") {
    return css`
      border: 1px solid transparent;
      background-color: ${styleColor[color][0]};
    `;
  }

  if (variant === "outline") {
    return css`
      border: 1px solid;
      border-color: ${styleColor[color][1]};
      background-color: transparent;
    `;
  }

  if (variant === "ghost") {
    return css`
      border: 1px solid transparent;
      background: transparent;
    `;
  }
}

function getButtonSize(size: ButtonSize) {
  if (size === "fullWidth") {
    return css`
      padding: ${({ theme }) => theme.spacing[5]}
        ${({ theme }) => theme.spacing[9]};
    `;
  }

  if (size === "sm") {
    return css`
      padding: ${({ theme }) => theme.spacing[2]}
        ${({ theme }) => theme.spacing[4]};
    `;
  }
}

type OuterLayoutProps = Pick<ButtonProps, "size" | "horizontalPosition">;

const OuterLayout = styled.View<OuterLayoutProps>`
  ${({ size, horizontalPosition }) =>
    size !== "fullWidth" &&
    css`
      align-items: ${horizontalPosition};
    `}
`;

type StyledButtonProps = Pick<ButtonProps, "variant" | "color" | "size">;

// NOTE: React Native's <Button /> component does not accept a style prop
//       so we use Pressable tag.
const StyledButton = styled.Pressable<StyledButtonProps>`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius.md};

  ${({ size }) => size && getButtonSize(size)};
  ${({ variant, color }) =>
    variant && color && getButtonStyles(variant, color)};
`;

const LoadingWrapper = styled.View`
  position: absolute;
`;

type ContentProps = {
  $isHidden: boolean;
} & Pick<ButtonProps, "variant" | "color" | "size">;

const StyledText = styled(Text)<ContentProps>`
  font-size: ${({ theme, size }) =>
    size === "sm" ? theme.fonts.sizes.sm : theme.fonts.sizes.md};

  opacity: ${({ $isHidden }) => ($isHidden ? "0" : "1")};
  color: ${({ variant, color, theme }) =>
    variant === "default"
      ? theme.colors.core.white.base
      : getColors(color as Colors)};
`;
