import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ImageBackground, View } from "react-native";
import styled from "styled-components/native";
import { StackParamList } from "../../../navigation/StackNavigationParams";
import Button from "../../atoms/Button";
import Spacer from "../../atoms/Spacer";
import { Text } from "../../atoms/Text";
import { Asset } from "expo-asset";

export default function SuccessMessage() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const illustrationURI = Asset.fromModule(
    require(`../../../assets/illustrations/EmailIllustration.png`)
  ).uri;

  return (
    <Container>
      <Illustration source={{ uri: illustrationURI }} resizeMode="cover" />

      <Spacer axis="vertical" size={1} />

      <Text color="grey" align="center">
        Nous t&apos;avons envoyé un mail pour modifier ton mot de passe.
      </Text>

      <Spacer axis="vertical" size={2} />

      <Button
        onPress={() => navigation.navigate("Se connecter")}
        horizontalPosition="stretch"
      >
        Je me connecte
      </Button>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Illustration = styled(ImageBackground)`
  width: 126px;
  height: 126px;
`;
