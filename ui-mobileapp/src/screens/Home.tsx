import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button as NativeButton, Text } from "react-native";
import { AuthParamList } from "../navigation/StackNavigationParams";
import { StackNavigationProp } from "@react-navigation/stack/";
import MainLayout from "../components/layouts/MainLayout";
import Button from "../components/atoms/Button";

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <MainLayout>
      <Text>Home</Text>

      <NativeButton
        title="S'inscrire"
        onPress={() => navigation.navigate("S'inscrire")}
      />

      <Button onPress={() => navigation.navigate("Se connecter")}>
        Se connecter
      </Button>
    </MainLayout>
  );
}
