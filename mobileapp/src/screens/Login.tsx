import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import Button from "../components/atoms/Button";
import Spacer from "../components/atoms/Spacer";
import { Heading } from "../components/atoms/Text";
import MainLayout from "../components/layouts/MainLayout";
import LoginForm from "../components/organisms/LoginForm/LoginForm";
import { AuthParamList } from "../navigation/StackNavigationParams";

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <MainLayout withBackButton>
      <Heading variant="h1">Inscription&nbsp;👋</Heading>

      <Spacer axis="vertical" size={3} />

      <LoginForm />

      <Spacer axis="vertical" size={0.5} />

      <Button
        variant="ghost"
        color="black"
        onPress={() => navigation.navigate("S'inscrire")}
      >
        Pas de compte ? S’inscrire
      </Button>
    </MainLayout>
  );
}
