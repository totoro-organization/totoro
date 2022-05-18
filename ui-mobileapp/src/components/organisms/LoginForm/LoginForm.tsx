import React from "react";
import styled from "styled-components/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Text } from "../../atoms/Text";
import Button from "../../atoms/Button";
import InputGroup from "../../molecules/InputGroup";
import { loginFormSchema } from "./loginValidationSchema";
import type { LoginFormValues } from "./loginValidationSchema";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabParamList } from "../../../navigation/StackNavigationParams";
import Spacer from "../../atoms/Spacer";

export default function LoginForm() {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(loginFormSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    // TODO: Add call api to login

    console.log(data);

    navigation.navigate("BottomTab");
  }

  return (
    <>
      <InputWrapper>
        <Text>Adresse de résidence</Text>

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

      <Button handlePress={handleSubmit(onSubmit)}>Se connecter</Button>
    </>
  );
}

const InputWrapper = styled.View`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
