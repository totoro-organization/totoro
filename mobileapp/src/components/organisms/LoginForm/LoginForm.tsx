import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import fetchLoginUser from "../../../common/api/requests/auth/fetchLoginUser";
import Alert from "../../atoms/Alert";

export default function LoginForm() {
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const [isEmailNotAvailable, setIsEmailNotAvailable] = useState({
    status: false,
    email: "",
  });

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(loginFormSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      const response = await fetchLoginUser({
        emailOrUsername: data.email,
        password: data.password,
      });

      if (response.status === 403) {
        setIsEmailNotAvailable({ status: true, email: data.email });
      }

      const userToken = await response.json();

      await AsyncStorage.setItem("userToken", JSON.stringify(userToken));
      setIsEmailNotAvailable({ status: false, email: "" });

      // TODO: Fix me
      // return navigation.navigate("BottomTab");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {isEmailNotAvailable.status && (
        <Alert type="error">
          Il semblerait que l'email suivante&nbsp;:{" "}
          <Text weight="medium">{isEmailNotAvailable.email}</Text> soit
          inexistante.
        </Alert>
      )}

      <Spacer axis="vertical" size={2} />

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

      <Button handlePress={handleSubmit(onSubmit)}>Se connecter</Button>
    </>
  );
}

const InputWrapper = styled.View`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;
