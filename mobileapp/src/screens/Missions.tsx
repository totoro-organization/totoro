import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Card } from "../components/atoms/Card";
import { Text } from "../components/atoms/Text";
import MainLayout from "../components/layouts/MainLayout";
import { StackParamList } from "../navigation/StackNavigationParams";

// TODO: Replace me to the real data with api.
// NOTE: The data schema isn't correct.
export const FAKE_MISSIONS = [
  {
    id: 0,
    organization: "Les restau du coeur",
    logo: "https://ongconseil.com/php/wp-content/uploads/2015/12/LogoRestos.jpg",
    title: "Collecte alimentaire",
    location: "Montreuil",
    description:
      "Faucibus lacus mi sed blandit id vivamus tortor sit est. Ac tempor, lectus nisi libero pretium eget elit. Tellus est tellus proin ornare viverra. Euismod et at venenatis turpis. Risus, ultrices amet et ante euismod ultrices turpis vel aliquet. Lacinia vestibulum ac, condimentum sit vestibulum, curabitur euismod. Aliquam porttitor sed pellentesque nulla. Egestas amet risus neque laoreet sollicitudin aliquam ultricies. Urna vehicula viverra varius sit.",
    tokens: 15,
    banner: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    tags: ["Solidarité et santé"],
    interestedParticipants: 12,
  },
  {
    id: 1,
    organization: "Solid’elles",
    logo: "https://solidelles.com/wp-content/uploads/2021/10/logovf-02.png",
    title: "Collecte de dons pour des femmes en situation de précarité",
    location: "Paris 12",
    description: "Faucibus lacus mi sed blandit id vivamus tortor sit est.",
    tokens: 15,
    banner: "https://images.unsplash.com/photo-1541802645635-11f2286a7482",
    tags: ["Solidarité et santé"],
    interestedParticipants: 43,
  },
];

export default function Missions() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <MainLayout>
      <Text>Missions</Text>

      {FAKE_MISSIONS.map(({ id, organization, title }) => {
        return (
          <Card
            style={{ marginTop: 16 }}
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
