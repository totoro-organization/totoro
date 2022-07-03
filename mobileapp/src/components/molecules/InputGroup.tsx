import React from "react";
import { FieldError } from "react-hook-form";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import Input from "../atoms/Input";
import Spacer from "../atoms/Spacer";
import { Text } from "../atoms/Text";

export type InputGroupProps = {
  error: FieldError | undefined;
  label?: string;
} & TextInputProps;

export default function InputGroup({
  error,
  label,
  ...nativeTextInputProps
}: InputGroupProps) {
  return (
    <>
      {label && (
        <>
          <Text>{label}</Text>

          <Spacer axis="vertical" size={0.5} />
        </>
      )}

      <Container>
        <Input {...nativeTextInputProps} error={!!error} />

        <ErrorMessage>{error?.message}</ErrorMessage>
      </Container>
    </>
  );
}

const Container = styled.View`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled(Text)`
  color: ${({ theme }) => theme.colors.core.error.base};
  min-height: 16px;
  font-size: 12px;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;
