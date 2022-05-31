import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text } from "../../atoms/Text";
import Button from "../../atoms/Button";

import { registerStepOneSchema } from "./registerValidationSchemas";
import type { RegisterStepOneFormValues } from "./registerValidationSchemas";
import InputGroup from "../../molecules/InputGroup";
import Spacer from "../../atoms/Spacer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RegisterStepOneProps = {
  nextStep: () => void;
};

export default function RegisterStepOne({ nextStep }: RegisterStepOneProps) {
  const { control, handleSubmit } = useForm<RegisterStepOneFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerStepOneSchema),
  });

  async function onSubmit(data: RegisterStepOneFormValues) {
    const body = {
      email: data.email,
      password: data.password,
    };

    await AsyncStorage.setItem("userFormData", JSON.stringify(body));
    nextStep();
  }

  return (
    <>
      <InputWrapper>
        <Text>Adresse e-mail</Text>

        <Spacer axis="vertical" size={0.5} />

        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputGroup
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="marie-zoli@gmail.com"
              error={error}
            />
          )}
        />
      </InputWrapper>

      <InputWrapper>
        <Text>Mot de passe</Text>

        <Spacer axis="vertical" size={0.5} />

        <Controller
          name="password"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputGroup
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="********"
              error={error}
            />
          )}
        />
      </InputWrapper>

      <InputWrapper>
        <Text>Confirmation du mot de passe</Text>

        <Spacer axis="vertical" size={0.5} />

        <Controller
          name="confirmPassword"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputGroup
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="********"
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
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
