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
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchRegisterUser from "../../../common/api/requests/auth/fetchRegisterUser";

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

  async function onSubmit(data: RegisterStepFinalFormValues) {
    const body = {
      // TODO: FIX TYPO!!!!!!!
      adress: data.address,
      longitude: 48.88039283558442,
      latitude: 2.4123843153442976,
      cp: 93310,
    };

    await AsyncStorage.mergeItem?.("userFormData", JSON.stringify(body));
    const user: any = await AsyncStorage.getItem("userFormData");

    const mocked_data = {
      firstname: "mae",
      lastname: "Lugat",
      username: "billy",
      email: "maet@gmail.com",
      password: "root",
      birthday: "1991-10-08",
      adress: "9 rue du progrès",
      longitude: 48.88039283558442,
      latitude: 2.4123843153442976,
      cp: 93310,
    };

    await fetchRegisterUser({ user: mocked_data });
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
