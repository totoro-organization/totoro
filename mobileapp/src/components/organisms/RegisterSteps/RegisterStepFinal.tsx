import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  RegisterStepFinalFormValues,
  registerStepFinalSchema,
} from "./registerValidationSchemas";

import { Text } from "../../atoms/Text";
import Button from "../../atoms/Button";
import styled from "styled-components/native";
import InputGroup from "../../molecules/InputGroup";
import Spacer from "../../atoms/Spacer";
import Alert from "../../atoms/Alert";

const ALERT_CONTENT_ADDRESS =
  "Totoro est une application de proximité, votre adresse de résidence nous permet de séléctionner les meilleurs missions près de chez vous.";

export default function RegisterStepFinal() {
  const { control, handleSubmit } = useForm<RegisterStepFinalFormValues>({
    defaultValues: {
      address: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerStepFinalSchema),
  });

  function onSubmit(data: RegisterStepFinalFormValues) {
    // TODO: Add call api to register (update user data) and redirect to posts page
    console.log(data);
  }

  return (
    <>
      <Alert type="info">{ALERT_CONTENT_ADDRESS}</Alert>

      <Spacer axis="vertical" size={3} />

      <InputWrapper>
        <Text>Adresse de résidence</Text>

        <Spacer axis="vertical" size={0.5} />

        {/* TODO: replace Input atom to autocomplete input address */}
        {/* NOTE: check this article: https://medium.com/debugger-off/how-to-use-google-autocomplete-api-s-and-react-native-maps-in-react-native-to-fetch-user-location-20d3f65af48b */}
        <Controller
          name="address"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <InputGroup
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="8 rue de la résidence des ploucs"
              error={error}
            />
          )}
        />

        <Button handlePress={handleSubmit(onSubmit)}>Je m'inscris !</Button>
      </InputWrapper>
    </>
  );
}

const InputWrapper = styled.View`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
