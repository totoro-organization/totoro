import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import Button from "../../components/atoms/Button";
import Spacer from "../../components/atoms/Spacer";
import { Heading } from "../../components/atoms/Text";
import SimpleLayout from "../../components/layouts/SimpleLayout";
import LoginForm from "../../components/organisms/LoginForm/LoginForm";
import { AuthParamList } from "../../navigation/StackNavigationParams";

// TODO: Add new layout
export default function Login() {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <SimpleLayout>
      <Heading variant="h1">Connexion&nbsp;👋</Heading>

      <Spacer axis="vertical" size={2} />

      <LoginForm />

      <Spacer axis="vertical" size={0.5} />

      <Button
        variant="ghost"
        color="black"
        onPress={() => navigation.navigate("Mot de passe oublié")}
      >
        J'ai oublié mont mot de passe
      </Button>
    </SimpleLayout>
  );
}
