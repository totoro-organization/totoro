import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text } from "react-native";
import Button from "../../atoms/Button";

import Input from "../..//atoms/Input";

import { registerStepOneSchema } from "./registerValidationSchemas";
import type { RegisterStepOneFormValues } from "./registerValidationSchemas";

export type RegisterStepOne = {
  nextStep: () => void;
};

export default function RegisterStepOne({ nextStep }: RegisterStepOne) {
  const { control, handleSubmit } = useForm<RegisterStepOneFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerStepOneSchema),
  });

  function onSubmit(data: RegisterStepOneFormValues) {
    // TODO: Add call api to register (create user)
    console.log(data);
    nextStep();
  }

  return (
    <Container>
      <InputWrapper>
        <Text>Adresse e-mail</Text>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              {/* TODO: Maybe add InputGroup molecule? (Input + Error message) */}
              <Input
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="marie-zoli@gmail.com"
                error={!!error}
              />

              {/* TODO: add our Text atom and use color="error" */}
              <ErrorMessage>{error?.message}</ErrorMessage>
            </>
          )}
        />
      </InputWrapper>

      <InputWrapper>
        <Text>Mot de passe</Text>
        <Controller
          name="password"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Input
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="********"
                error={!!error}
              />

              <ErrorMessage>{error?.message}</ErrorMessage>
            </>
          )}
        />
      </InputWrapper>

      <InputWrapper>
        <Text>Confirmation du mot de passe</Text>
        <Controller
          name="confirmPassword"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Input
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="********"
                error={!!error}
              />

              <ErrorMessage>{error?.message}</ErrorMessage>
            </>
          )}
        />
      </InputWrapper>

      <Button onPress={handleSubmit(onSubmit)}>Suivant</Button>
    </Container>
  );
}

const Container = styled.View`
  display: grid;
  grid-gap: 1rem;
`;

const InputWrapper = styled.View`
  display: grid;
  grid-gap: 0.5rem;
`;

const ErrorMessage = styled.Text`
  color: red;
  min-height: 0.75rem;
  font-size: 0.75rem;
`;
