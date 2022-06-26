import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Heading, Text } from "../../../components/atoms/Text";
import Spacer from "../../../components/atoms/Spacer";
import { Controller, useForm } from "react-hook-form";
import { forgotPasswordFormSchema } from "./forgotPasswordValidationSchema";
import type { ForgotPasswordFormValues } from "./forgotPasswordValidationSchema";
import Button from "../../atoms/Button";
import InputGroup from "../../molecules/InputGroup";

type ForgotPasswordForm = {
  nextStep: () => void;
};

export default function ForgotPasswordForm({ nextStep }: ForgotPasswordForm) {
  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  function submit(data: ForgotPasswordFormValues) {
    console.log("TODO: Add forgot password function with call api", data);

    // TODO: Enable next-step only if the call api return success.
    nextStep();
  }

  return (
    <>
      <Heading variant="h1">Mot de passe oublié ? 🔐</Heading>

      <Spacer axis="vertical" size={1} />

      <Text color="grey">
        Pas de panique&nbsp;! Tu peux rentrer ton adresse email associée à ton
        compte pour récupérer ton mot de passe.
      </Text>

      <Spacer axis="vertical" size={2} />

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
            placeholder="joseph@totoro.com"
            textContentType="emailAddress"
            error={error}
          />
        )}
      />

      <Spacer axis="vertical" size={2} />

      <Button handlePress={handleSubmit(submit)}>Envoyer</Button>
    </>
  );
}
