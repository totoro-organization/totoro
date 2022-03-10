import React from "react";
import { FieldError } from "react-hook-form";
import { TextInputProps, View } from "react-native";
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
  display: grid;
  grid-gap: 0.5rem;
`;

/* TODO: add error theme color */
const ErrorMessage = styled(Text)`
  color: red;
  min-height: 0.75rem;
  font-size: 0.75rem;
`;
