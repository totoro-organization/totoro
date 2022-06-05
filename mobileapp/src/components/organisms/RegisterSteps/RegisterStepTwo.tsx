import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import createUsername from "../../../common/utils/createUsername";

import DateTimePickerInput from "../../molecules/DateTimePickerInput";

const ALERT_CONTENT_LASTNAME =
  "Votre nom de famille nous permet de récupérer seulement votre initial. Cette information ne sera pas accessible par l’ensemble des utilisateurs.";

export type RegisterStepTwoProps = {
  nextStep: () => void;
};

export default function RegisterStepTwo({ nextStep }: RegisterStepTwoProps) {
  const { control, handleSubmit } = useForm<RegisterStepTwoFormValues>({
    defaultValues: {
      firstname: "",
      lastname: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerStepTwoSchema),
  });

  async function onSubmit(data: RegisterStepTwoFormValues) {
    const body = {
      firstname: data.firstname,
      lastname: data.lastname,
      birthday: data.birthday,

      username: createUsername(data.firstname, data.lastname),
    };

    console.log("ui");
    console.log(data);
    // await AsyncStorage.mergeItem?.("userFormData", JSON.stringify(body));

    // nextStep();
  }

  return (
    <>
      <Alert type="info">{ALERT_CONTENT_LASTNAME}</Alert>

      <Spacer axis="vertical" size={3} />

      <InputWrapper>
        <Text>Prénom</Text>

        <Spacer axis="vertical" size={0.5} />

        <Controller
          name="firstname"
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
          name="lastname"
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

      <Controller
        name="lastname"
        control={control}
        render={({ field: { onChange } }) => (
          <DateTimePickerInput
            label="Date de naissance"
            onChange={(value: any) => onChange(value)}
            name="lastname"
          />
        )}
      />

      <Spacer axis="vertical" size={3} />

      <Button handlePress={handleSubmit(onSubmit)}>Suivant</Button>
    </>
  );
}

const InputWrapper = styled.View`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
