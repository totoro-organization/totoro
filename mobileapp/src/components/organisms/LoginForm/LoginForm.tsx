import React from "react";
import styled from "styled-components/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { loginFormSchema } from "./loginValidationSchema";
import type { LoginFormValues } from "./loginValidationSchema";

import { Text } from "../../atoms/Text";
import Button from "../../atoms/Button";
import Spacer from "../../atoms/Spacer";
import Alert from "../../atoms/Alert";
import InputGroup from "../../molecules/InputGroup";

import useAuth from "../../../common/contexts/AuthContext";

export default function LoginForm() {
  const { login, error } = useAuth();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(loginFormSchema),
  });

  return (
    <>
      {error?.status && (
        <>
          <Alert type="error">
            Il semblerait que l'email suivante&nbsp;:{" "}
            <Text weight="medium">{error?.email}</Text> soit inexistante.
          </Alert>

          <Spacer axis="vertical" size={2} />
        </>
      )}

      <InputWrapper>
        <Text>Adresse email</Text>

        <Spacer axis="vertical" size={0.5} />

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
              placeholder="*******"
              error={error}
            />
          )}
        />
      </InputWrapper>

      <Button handlePress={handleSubmit(login)}>Se connecter</Button>
    </>
  );
}

const InputWrapper = styled.View`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
