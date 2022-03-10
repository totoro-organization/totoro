import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text } from "react-native";
import Button from "../../atoms/Button";

import {
  RegisterStepTwoFormValues,
  registerStepTwoSchema,
} from "./registerValidationSchemas";
import InputGroup from "../../molecules/InputGroup";

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
            <InputGroup
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Marie"
              error={error}
            />
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
            <InputGroup
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Zoli"
              error={error}
            />
          )}
        />
      </InputWrapper>

      <InputWrapper>
        <Text>Date de naissance</Text>
        <Controller
          name="birthDate"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputGroup
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error}
            />
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
            <InputGroup
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error}
            />
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
