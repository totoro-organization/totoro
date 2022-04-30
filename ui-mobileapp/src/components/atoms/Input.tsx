import { TextInputProps } from "react-native";
import styled from "styled-components/native";

export type InputProps = { error?: boolean } & TextInputProps;

export default function Input({
  error = false,
  ...nativeTextInputProps
}: InputProps) {
  return <StyledInput $error={error} {...nativeTextInputProps} />;
}

const StyledInput = styled.TextInput<{ $error: boolean }>`
  padding: 14px;
  border: ${({ theme }) => theme.border.width[1]} solid
    ${({ theme, $error }) => ($error ? "red" : theme.colors.grey[200])};
  border-radius: ${({ theme }) => theme.border.radius.md};
  background-color: ${({ theme, $error }) =>
    $error ? theme.colors.primary[50] : theme.colors.grey[50]};
  color: ${({ theme }) => theme.colors.grey[900]};
  font-family: "Outfit";

  /* NOTE: Box-shadow on react-native app. */
  shadow-opacity: 0.75;
  shadow-radius: 4px;
  shadow-color: ${({ $error }) => ($error ? "red" : "transparent")};
  shadow-offset: 0px 0px;

  &:focus-visible {
    border: 1px solid blue;
  }
`;
