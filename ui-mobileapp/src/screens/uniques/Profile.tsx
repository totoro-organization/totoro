import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import Button from "../../components/atoms/Button";
import Spacer from "../../components/atoms/Spacer";
import { Text } from "../../components/atoms/Text";
import MainLayout from "../../components/layouts/MainLayout";
import { StackParamList } from "../../navigation/StackNavigationParams";

export type ProfileType = "user" | "organization";

export default function Profile({
  route,
}: StackScreenProps<StackParamList, "Profile">) {
  const paramId = route.params.id;
  const type = route.params.type;

  const isUser = type === "user";
  const isOrganization = type === "organization";

  return (
    <MainLayout>
      <Text>{type} profile page</Text>

      <Spacer axis="vertical" size={1} />

      {isOrganization && (
        // TODO: Add function to follow organization with call api
        <Button
          size="sm"
          handlePress={() => console.log("suivi !")}
          color="black"
        >
          Suivre
        </Button>
      )}
    </MainLayout>
  );
}
