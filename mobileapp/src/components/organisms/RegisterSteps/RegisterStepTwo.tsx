import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text } from "../../atoms/Text";
import Button from "../../atoms/Button";

import {
  RegisterStepTwoFormValues,
  registerStepTwoSchema,
} from "./registerValidationSchemas";
import InputGroup from "../../molecules/InputGroup";
import Spacer from "../../atoms/Spacer";
import Alert from "../../atoms/Alert";
import fetchSubmitRegisterUser from "../../../common/api/requests/auth/fetchRegisterUser";

const ALERT_CONTENT_LASTNAME =
  "Votre nom de famille nous permet de récupérer seulement votre initial. Cette information ne sera pas accessible par l’ensemble des utilisateurs.";

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

  async function onSubmit(data: RegisterStepTwoFormValues) {
    // TODO: Add call api to register (update user data)
    console.log(data);
    await fetchSubmitRegisterUser({
      user: {
        firstname: "Mae",
        lastname: "Test",
        username: "morice",
        email: "morice@gmail.com",
        password: "root",
        birthday: "1991-10-08",
        phone: "ddd",
      },
    });

    nextStep();
  }

  return (
    <>
      <Alert type="info">{ALERT_CONTENT_LASTNAME}</Alert>

      <Spacer axis="vertical" size={3} />

      <InputWrapper>
        <Text>Prénom</Text>

        <Spacer axis="vertical" size={0.5} />

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

        <Spacer axis="vertical" size={0.5} />

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

        <Spacer axis="vertical" size={0.5} />

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

        <Spacer axis="vertical" size={0.5} />

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

      <Button handlePress={handleSubmit(onSubmit)}>Suivant</Button>
    </>
  );
}

const InputWrapper = styled.View`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
