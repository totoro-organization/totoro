import React from "react";
import { Text } from "../components/atoms/Text";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthParamList } from "../navigation/StackNavigationParams";
import Button from "../components/atoms/Button";

export default function Explanation() {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  return (
    <Container>
      <WhiteText>Participes à des missions</WhiteText>
      <WhiteText>Sois récompensé-e avec notre système de tokens</WhiteText>
      <WhiteText>Viens convertir tes tokens en bons de réduction</WhiteText>

      <Button onPress={() => navigation.navigate("Se connecter")}>
        Se connecter
      </Button>

      <Button onPress={() => navigation.navigate("S'inscrire")}>
        S'inscrire
      </Button>
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grey[900]};
`;

const WhiteText = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.white[600]};
`;
