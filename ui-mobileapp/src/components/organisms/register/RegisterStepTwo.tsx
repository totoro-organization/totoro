import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text } from "react-native";
import Button from "../../atoms/Button";

import Input from "../..//atoms/Input";
import {
  RegisterStepTwoFormValues,
  registerStepTwoSchema,
} from "./registerValidationSchemas";

export type RegisterStepTwoProps = {
  nextStep: () => void;
};

export default function RegisterStepTwo({ nextStep }: RegisterStepTwoProps) {
  const { control, handleSubmit } = useForm<RegisterStepTwoFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      phoneNumber: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerStepTwoSchema),
  });

  function onSubmit(data: RegisterStepTwoFormValues) {
    // TODO: Add call api to register (update user data)
    console.log(data);
    nextStep();
  }

  return (
    //   TODO: add grid container
    <>
      <InputWrapper>
        <Text>Prénom</Text>
        <Controller
          name="firstName"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              {/* TODO: Maybe add InputGroup molecule? (Input + Error message) */}
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Marie"
                error={!!error}
              />

              {/* TODO: add our Text atom and use color="error" */}
              <ErrorMessage>{error?.message}</ErrorMessage>
            </>
          )}
        />
      </InputWrapper>

      <InputWrapper>
        <Text>Nom</Text>
        <Controller
          name="lastName"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              {/* TODO: Maybe add InputGroup molecule? (Input + Error message) */}
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Zoli"
                error={!!error}
              />

              {/* TODO: add our Text atom and use color="error" */}
              <ErrorMessage>{error?.message}</ErrorMessage>
            </>
          )}
        />
      </InputWrapper>

      <InputWrapper>
        <Text>Date de naissance</Text>
        {/* TODO: replace input to date picker */}
        <Controller
          name="birthDate"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              {/* TODO: Maybe add InputGroup molecule? (Input + Error message) */}
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!error}
              />

              {/* TODO: add our Text atom and use color="error" */}
              <ErrorMessage>{error?.message}</ErrorMessage>
            </>
          )}
        />
      </InputWrapper>
      <InputWrapper>
        <Text>Numéro de téléphone</Text>
        <Controller
          name="phoneNumber"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              {/* TODO: Maybe add InputGroup molecule? (Input + Error message) */}
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!error}
              />

              {/* TODO: add our Text atom and use color="error" */}
              <ErrorMessage>{error?.message}</ErrorMessage>
            </>
          )}
        />
      </InputWrapper>

      <Button onPress={handleSubmit(onSubmit)}>Suivant</Button>
    </>
  );
}

const InputWrapper = styled.View`
  display: grid;
  grid-gap: 0.5rem;
`;

const ErrorMessage = styled.Text`
  color: red;
  min-height: 0.75rem;
  font-size: 0.75rem;
`;
