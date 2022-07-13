import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
      <Controller
        name="email"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <InputGroup
            keyboardType="email-address"
            textContentType="emailAddress"
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
            textContentType="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="********"
            error={error}
            testID="input-password"
          />
        )}
      />

      <Spacer axis="vertical" size={1} />

      <Controller
        name="confirmPassword"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <InputGroup
            secureTextEntry
            textContentType="password"
            label="Confirmation du mot de passe"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="********"
            error={error}
            testID="input-confirm-password"
          />
        )}
      />

      <Spacer axis="vertical" size={3} />

      <Button onPress={handleSubmit(onSubmit)} testID="button-next-step-one">
        Suivant
      </Button>
    </>
  );
}
