import React, { PropsWithChildren, useState } from "react";
import styled, { css } from "styled-components/native";

import { PressableProps } from "react-native";
import { FlattenSimpleInterpolation } from "styled-components";
import { Text } from "./Text";
import theme from "../../theme/theme";
import Spinner from "./Spinner";
import { Colors, getColors } from "../../theme/utils";

export type ButtonColor = "black" | "primary";
export type ButtonVariant = "default" | "outline" | "ghost";

export type ButtonProps = PropsWithChildren<
  {
    variant?: ButtonVariant;
    color?: ButtonColor;
    handlePress?: () => void | Promise<void> | unknown;
    className?: string;
  } & PressableProps
>;

// TODO: add isLoading and disabled states?
export default function Button({
  variant = "default",
  color = "primary",
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
          return (
            <StyledText
              $isHidden={isInternalLoading}
              variant={variant}
              color={color}
            >
              {child}
            </StyledText>
          );
        }
        return (
          <Element
            $isHidden={isInternalLoading}
            variant={variant}
            color={color}
          >
            {child}
          </Element>
        );
      })}
    </StyledButton>
  );
}

export type ColorVariables = {
  background: string;
  //   disabled?: string;
  border: string;
};

function getButtonVariables(variables: ColorVariables) {
  const backgroundColor = variables.background;
  const borderColor = variables.border;

  return [backgroundColor, borderColor];
}

const styleColor: { [key in ButtonColor]: FlattenSimpleInterpolation } = {
  black: getButtonVariables({
    background: theme.colors.grey[900],
    border: theme.colors.grey[900],
  }),

  primary: getButtonVariables({
    background: theme.colors.primary[500],
    border: theme.colors.primary[500],
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

type StyledButtonProps = Pick<ButtonProps, "variant" | "color">;

// NOTE: React Native's <Button /> component does not accept a style prop
//       so we use Pressable tag.
const StyledButton = styled.Pressable<StyledButtonProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[9]};
  font-size: 16px;

  ${({ variant, color }) =>
    variant && color && getButtonStyles(variant, color)};
`;

const LoadingWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

type ButtonContentProps = {
  $isHidden: boolean;
} & Pick<ButtonProps, "variant" | "color">;

const buttonContentStyle = css<ButtonContentProps>`
  opacity: ${({ $isHidden }) => ($isHidden ? "0" : "1")};
  color: ${({ variant, color, theme }) =>
    variant === "default"
      ? theme.colors.white[600]
      : getColors(color as Colors)};
`;

const StyledText = styled(Text)<ButtonContentProps>`
  ${buttonContentStyle};
`;

const Element = styled.View<ButtonContentProps>`
  display: flex;
  align-items: center;
  ${buttonContentStyle};
`;
