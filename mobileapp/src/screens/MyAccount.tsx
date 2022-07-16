import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import useAuth from "../common/hooks/useAuth";
import Avatar from "../components/atoms/Avatar";
import Box from "../components/atoms/Box";
import Button from "../components/atoms/Button";
import { Text } from "../components/atoms/Text";
import MainLayout from "../components/layouts/SimpleLayout";
import { StackParamList } from "../navigation/StackNavigationParams";

export default function MyAccount() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();

    navigation.navigate("Explications");
  }

  return (
    <MainLayout>
      <Text>My Account</Text>

      <Box alignItems="center" justifyContent="center" flexDirection="column">
        <Avatar user={user} />

        <Text>{`${user?.firstname} ${user?.lastname}`}</Text>
      </Box>

      <Button handlePress={handleLogout}>Se déconnecter</Button>
    </MainLayout>
  );
}
