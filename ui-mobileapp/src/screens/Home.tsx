import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text } from "react-native";
import { AuthParamList } from "../navigation/StackNavigationParams";
import { StackNavigationProp } from "@react-navigation/stack/";
import MainLayout from "../components/layouts/MainLayout";

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <MainLayout>
      <Text>Home</Text>

      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate("S'inscrire")}
      />

      <Button
        title="Se connecter"
        onPress={() => navigation.navigate("Se connecter")}
      />
    </MainLayout>
  );
}
