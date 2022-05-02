import React from "react";
import { Text } from "../../components/atoms/Text";
import MainLayout from "../../components/layouts/MainLayout";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../../navigation/StackNavigationParams";

export default function Mission({
  route,
}: StackScreenProps<StackParamList, "Mission">) {
  const missionId = route.params;
  console.log(missionId);

  // TODO: Create hook with fetch API to get mission by id.
  //   const { mission } = useMission(missionId);

  return (
    <MainLayout>
      <Text>Unique mission (single page for each missions)</Text>
    </MainLayout>
  );
}
