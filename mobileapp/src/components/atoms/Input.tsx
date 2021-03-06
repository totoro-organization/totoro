import { useState } from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import useBoolean from "../../common/hooks/useBoolean";
import theme from "../../theme/theme";

export type InputProps = { error?: boolean } & TextInputProps;

export default function Input({
  error = false,
  ...nativeTextInputProps
}: InputProps) {
  const [isActive, setIsActive] = useBoolean();

  return (
    <StyledInput
      placeholderTextColor={theme.colors.v1.grey[400]}
      $error={error}
      $active={isActive}
      {...nativeTextInputProps}
      onFocus={setIsActive.on}
      onBlur={setIsActive.off}
    />
  );
}

const StyledInput = styled.TextInput<{ $error: boolean; $active: boolean }>`
  padding: ${({ theme }) => theme.spacing[3.5]};
  border: ${({ theme }) => theme.border.width[1]} solid
    ${({ theme, $error, $active }) =>
      $error
        ? "red"
        : $active
        ? theme.colors.brand.primary.base
        : theme.colors.v1.grey[200]};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background-color: ${({ theme, $error }) =>
    $error ? theme.colors.core.error.lightest : theme.colors.v1.grey[50]};
  color: ${({ theme }) => theme.colors.core.black.base};
  font-family: ${({ theme }) => theme.fonts.weight.medium};
`;
