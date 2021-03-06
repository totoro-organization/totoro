import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import Avatar from "../../components/atoms/Avatar";
import Button from "../../components/atoms/Button";
import Spacer from "../../components/atoms/Spacer";
import { Text } from "../../components/atoms/Text";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import { StackParamList } from "../../navigation/StackNavigationParams";

export type ProfileType = "user" | "organization";

export default function Profile({
  route,
}: StackScreenProps<StackParamList, "Profile">) {
  const paramId = route.params.id;
  const type = route.params.type;

  const isOrganization = type === "organization";

  return (
    <GlobalLayout pageTitle="">
      <Text>{type} profile page</Text>

      <Spacer axis="vertical" size={1} />

      {/* TODO: Replace this placeholder to the real picture or logo. */}
      <Avatar src="https://images.unsplash.com/photo-1566492031773-4f4e44671857" />

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
    </GlobalLayout>
  );
}
