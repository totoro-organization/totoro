import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import useAuth from "../common/contexts/AuthContext";
import Button from "../components/atoms/Button";
import { Text } from "../components/atoms/Text";
import MainLayout from "../components/layouts/MainLayout";
import { StackParamList } from "../navigation/StackNavigationParams";

export default function MyAccount() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout?.();

    navigation.navigate("Explications");
  }
  return (
    <MainLayout>
      <Text>My Account</Text>

      <Button handlePress={handleLogout}>Se déconnecter</Button>
    </MainLayout>
  );
}
