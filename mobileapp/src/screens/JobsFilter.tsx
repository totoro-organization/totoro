import React, { useState } from "react";
import GlobalLayout from "../components/layouts/GlobalLayout";
import { Text } from "../components/atoms/Text";
import styled from "styled-components/native";
import Spacer from "../components/atoms/Spacer";
import Button from "../components/atoms/Button";
import { useNavigation } from "@react-navigation/native";
import { AppParamList } from "../navigation/StackNavigationParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import useTotoroTags from "../common/api/hooks/useTotoroTags";
import RadioGroup from "../components/molecules/RadioGroup";
import PillGroup from "../components/molecules/PillGroup";
import Slider from "../components/atoms/Slider";
import Box from "../components/atoms/Box";
import Checkbox from "../components/atoms/Checkbox";

// TODO: Fix header or add this component as Modal?
export default function JobsFilter() {
  const [distanceValue, setDistanceValue] = useState<number | number[]>(0);

  const navigation = useNavigation<StackNavigationProp<AppParamList>>();
  const { tags, categories } = useTotoroTags();

  const tagsLabel = tags.map(({ label }) => label);
  const categoriesLabel = categories.map(({ label }) => label);

  const sortLabel = [
    "Nouvellement publiées",
    "Mieux récompensées",
    "Organisées prochainement",
  ];

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
        <CategoryTitle>Trier par</CategoryTitle>

        <RadioGroup
          options={sortLabel}
          handlePress={(data) => console.log(data)}
        />
      </CategorySection>

      <CategorySection>
        <CategoryTitle>Activité</CategoryTitle>

        <PillGroup
          options={tagsLabel}
          handlePress={(data) => console.log(data)}
        />
      </CategorySection>

      <CategorySection>
        <CategoryTitle>Cause défendue</CategoryTitle>

        <PillGroup
          options={categoriesLabel}
          handlePress={(data) => console.log(data)}
        />
      </CategorySection>

      <CategorySection>
        <Box justifyContent="space-between">
          <CategoryTitle>DISTANCE (en km)</CategoryTitle>
          <Text size="xs">{`< ${distanceValue}`}</Text>
        </Box>

        <Slider
          value={distanceValue}
          minimumValue={0}
          maximumValue={200}
          animationType="spring"
          onValueChange={(value) => setDistanceValue(value)}
        />
      </CategorySection>

      <CategorySection>
        <CategoryTitle>AUTRES</CategoryTitle>

        <Checkbox label="Voir uniquement les associations suivies" />

        <Spacer axis="vertical" size={1} />

        <Checkbox label="Voir uniquement les missions auxquelles je ne participe pas déjà" />

        <Spacer axis="vertical" size={1} />

        <Checkbox label="Voir uniquement les missions pour lesquelles il reste des places" />
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
  color: ${({ theme }) => theme.colors.v1.grey[500]};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  letter-spacing: 2px;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;
