import React from "react";
import { FieldError } from "react-hook-form";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import Input from "../atoms/Input";
import { Text } from "../atoms/Text";

export type InputGroupProps = {
  error: FieldError | undefined;
} & TextInputProps;

export default function InputGroup({
  error,
  ...nativeTextInputProps
}: InputGroupProps) {
  return (
    <Container>
      <Input {...nativeTextInputProps} error={!!error} />

      <ErrorMessage>{error?.message}</ErrorMessage>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled(Text)`
  color: ${({ theme }) => theme.colors.error[500]};
  min-height: 16px;
  font-size: 12px;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;
