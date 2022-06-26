import { useState } from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import useBoolean from "../../common/hooks/useBoolean";

export type InputProps = { error?: boolean } & TextInputProps;

export default function Input({
  error = false,
  ...nativeTextInputProps
}: InputProps) {
  const [isActive, setIsActive] = useBoolean();

  return (
    <StyledInput
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
        ? theme.colors.grey[900]
        : theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background-color: ${({ theme, $error }) =>
    $error ? theme.colors.primary[50] : theme.colors.grey[50]};
  color: ${({ theme }) => theme.colors.grey[900]};
  font-family: ${({ theme }) => theme.fonts.weight.medium};
`;
