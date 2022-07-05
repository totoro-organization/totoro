import React from "react";
import { Asset } from "expo-asset";
import styled from "styled-components/native";

import Box from "../../atoms/Box";
import { Text } from "../../atoms/Text";
import Spacer from "../../atoms/Spacer";
import Button from "../../atoms/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../../navigation/StackNavigationParams";

export default function ConversationsNotFound() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const illustrationURI = Asset.fromModule(
    require(`../../../assets/illustrations/ConversationsNotFoundIllustration.png`)
  ).uri;

  return (
    <Box alignItems="center" flexDirection="column">
      <Illustration source={{ uri: illustrationURI }} resizeMode="cover" />

      <Spacer axis="vertical" size={2} />

      <Text align="center">Aucune conversation n’a été trouvée...</Text>

      <Spacer axis="vertical" size={1} />

      <Text align="center">
        En participant à une mission, une conversation de groupe est
        automatiquement créée.
      </Text>

      <Spacer axis="vertical" size={3} />

      <Button
        size="sm"
        // FIXME
        // handlePress={() => navigation.navigate({ "Jobs" })}
      >
        Trouver une mission
      </Button>
    </Box>
  );
}

const Illustration = styled.ImageBackground`
  width: 126px;
  height: 126px;
`;
