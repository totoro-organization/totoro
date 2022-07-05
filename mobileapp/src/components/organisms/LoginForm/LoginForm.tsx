import React from "react";
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

      <Controller
        name="email"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <InputGroup
            label="Adresse email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="marie-zoli@gmail.com"
            error={error}
            testID="input-email"
          />
        )}
      />

      <Spacer axis="vertical" size={1} />

      <Controller
        name="password"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <InputGroup
            secureTextEntry
            label="Mot de passe"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="*******"
            error={error}
            testID="input-password"
          />
        )}
      />

      <Spacer axis="vertical" size={3} />

      <Button handlePress={handleSubmit(login)} testID="button-user-login">
        Se connecter
      </Button>
    </>
  );
}
