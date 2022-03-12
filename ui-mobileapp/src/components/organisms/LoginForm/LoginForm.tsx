import React from "react";
import styled from "styled-components/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Text } from "../../atoms/Text";
import Button from "../../atoms/Button";
import InputGroup from "../../molecules/InputGroup";
import { loginFormSchema } from "./loginValidationSchema";
import type { LoginFormValues } from "./loginValidationSchema";

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(loginFormSchema),
  });

  function onSubmit(data: LoginFormValues) {
    // TODO: Add call api to login
    console.log(data);
  }

  return (
    <>
      <InputWrapper>
        <Text>Adresse de résidence</Text>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputGroup
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
              placeholder="*******"
              error={error}
            />
          )}
        />
      </InputWrapper>

      <Button onPress={handleSubmit(onSubmit)}>Se connecter</Button>
    </>
  );
}

const InputWrapper = styled.View`
  display: grid;
  grid-gap: 0.5rem;
`;
