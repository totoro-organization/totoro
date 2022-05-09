import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text } from "../../components/atoms/Text";
import MainLayout from "../../components/layouts/MainLayout";
import { StackParamList } from "../../navigation/StackNavigationParams";

export type ProfileType = "user" | "organization";

export default function Profile({
  route,
}: StackScreenProps<StackParamList, "Profile">) {
  const type = route.params.type;

  const isUserProfile = type === "user";
  const isOrganizationProfile = type === "organization";

  return (
    <MainLayout>
      <Text>{type} profile page</Text>
    </MainLayout>
  );
}
