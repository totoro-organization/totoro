import React from "react";
import * as Yup from "yup";
import Spacer from "../../components/atoms/Spacer";
import SimpleLayout from "../../components/layouts/SimpleLayout";
import { Heading, Text } from "../../components/atoms/Text";
import {
  PASSWORD_DONT_MATCH_MSG,
  REQUIRED_MSG,
  TOO_SHORT_STRING_MSG,
} from "../../common/forms/validationConstants";
import InputGroup from "../../components/molecules/InputGroup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/atoms/Button";

export const changePasswordValidationSchema = Yup.object({
  password: Yup.string().min(6, TOO_SHORT_STRING_MSG).required(REQUIRED_MSG),
  confirmPassword: Yup.string()
    .required(REQUIRED_MSG)
    .oneOf([Yup.ref("password")], PASSWORD_DONT_MATCH_MSG),
}).required();

type ChangePasswordFormValues = Yup.InferType<
  typeof changePasswordValidationSchema
>;

export default function ChangePassword() {
  const { control, handleSubmit } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: yupResolver(changePasswordValidationSchema),
  });

  function onSubmit(data: ChangePasswordFormValues) {
    console.log(
      "TODO: Add call api to change password and redirect to the success screen.",
      data
    );
  }

  return (
    <SimpleLayout>
      <Heading variant="h1">Connexion&nbsp;👋</Heading>

      <Spacer axis="vertical" size={1} />

      <Text color="grey">
        Ton nouveau mot de passe doit être différent de ton ancien mot de passe.
      </Text>

      <Spacer axis="vertical" size={2} />

      {/* TODO: Add this state with call api error. */}
      {/* {error && (
        <>
          <Alert type="error">
             Il semblerait que le nouveau mot de passe soit similaire à l’ancien. Veuillez choisir un nouveau mot de passe.
          </Alert>

          <Spacer axis="vertical" size={2} />
        </>
      )} */}

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
            label="Nouveau mot de passe"
            placeholder="*******"
            error={error}
          />
        )}
      />

      <Spacer axis="vertical" size={2} />

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
            label="Confirmation du mot de passe"
            placeholder="*******"
            error={error}
          />
        )}
      />

      <Spacer axis="vertical" size={2} />

      <Button handlePress={handleSubmit(onSubmit)}>Je valide</Button>
    </SimpleLayout>
  );
}
