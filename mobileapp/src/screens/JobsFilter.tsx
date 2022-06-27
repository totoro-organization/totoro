import React from "react";
import GlobalLayout from "../components/layouts/GlobalLayout";
import { Text } from "../components/atoms/Text";
import styled from "styled-components/native";
import Spacer from "../components/atoms/Spacer";
import Button from "../components/atoms/Button";
import { useNavigation } from "@react-navigation/native";
import { AppParamList } from "../navigation/StackNavigationParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

export default function JobsFilter() {
  const navigation = useNavigation<StackNavigationProp<AppParamList>>();

  return (
    <GlobalLayout pageTitle="Filtres">
      <TouchableOpacity
        onPress={() =>
          console.log("ajouter la function pour supprimer tous les filtres?")
        }
      >
        <Text underline>Effacer les filtres</Text>
      </TouchableOpacity>

      <Spacer axis="vertical" size={2} />

      <CategorySection>
        <CategoryTitle>TyJob</CategoryTitle>

        <Spacer axis="vertical" size={0.5} />

        <Text>TODO: Ajouter les boutons</Text>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>Catégorie</CategoryTitle>

        <Spacer axis="vertical" size={0.5} />

        <Text>TODO: Ajouter les boutons</Text>
      </CategorySection>

      <CategorySection>
        <CategoryTitle>DISTANCE (en km)</CategoryTitle>

        <Spacer axis="vertical" size={0.5} />

        <Text>TODO: Ajouter le slider</Text>
      </CategorySection>

      <Button
        handlePress={() => {
          console.log(
            "Ajouter les filtres dans le param avec la redirection vers la page mission"
          );

          navigation.navigate("Jobs");
        }}
      >
        Appliquer les filtres
      </Button>
    </GlobalLayout>
  );
}

const CategorySection = styled.View`
  margin-bottom: 40px;
`;

const CategoryTitle = styled(Text)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.grey[500]};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  letter-spacing: 2px;
`;
