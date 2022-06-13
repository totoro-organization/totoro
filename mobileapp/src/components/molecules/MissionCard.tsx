import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StackParamList } from "../../navigation/StackNavigationParams";
import { Card } from "../atoms/Card";
import { Text } from "../atoms/Text";

// TODO: add model of Mission.
type MissionCardProps = {
  mission: any;
};

// TODO: Add real design
export default function MissionCard({ mission }: MissionCardProps) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Card onPress={() => navigation.navigate("Mission", { id: mission.id })}>
      <Text>
        {mission.title} - {mission.organization.name}
      </Text>
    </Card>
  );
}
