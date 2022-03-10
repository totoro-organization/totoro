import { TextInputProps } from "react-native";
import styled from "styled-components/native";

// TODO: Add real style (check figma)
// TODO: add style for focus state
const StyledInput = styled.TextInput<{ $error: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${({ $error }) => ($error ? "red" : "grey")};
`;

export type InputProps = { error?: boolean } & TextInputProps;

export default function Input({
  error = false,
  ...nativeTextInputProps
}: InputProps) {
  return <StyledInput $error={error} {...nativeTextInputProps} />;
}
