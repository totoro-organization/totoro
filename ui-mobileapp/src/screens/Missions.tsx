import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Card } from "../components/atoms/Card";
import { Text } from "../components/atoms/Text";
import MainLayout from "../components/layouts/MainLayout";
import { StackParamList } from "../navigation/StackNavigationParams";

// TODO: Replace me to the real data with api.
export const FAKE_MISSIONS = [
  {
    id: 1,
    organization: "Les restau du coeur",
    title: "Collecte alimentaire",
    tokens: 15,
  },
  {
    id: 2,
    organization: "Solid’elles",
    title: "Collecte de dons pour des femmes en situation de précarité",
    tokens: 15,
  },
];

// NOTE: find a better naming?
export default function Missions() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <MainLayout>
      <Text>Missions</Text>

      {FAKE_MISSIONS.map(({ id, organization, title }) => {
        return (
          <Card
            style={{ marginTop: "16px" }}
            onPress={() => navigation.navigate("Mission", { id: id })}
            key={id}
          >
            <Text>
              {title} - {organization}
            </Text>
          </Card>
        );
      })}
    </MainLayout>
  );
}
