import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import useAuth from "../common/contexts/AuthContext";
import Button from "../components/atoms/Button";
import { Text } from "../components/atoms/Text";
import MainLayout from "../components/layouts/MainLayout";

export default function MyAccount() {
  const { logout } = useAuth();

  return (
    <MainLayout>
      <Text>My Account</Text>

      <Button handlePress={logout}>Se déconnecter</Button>
    </MainLayout>
  );
}
