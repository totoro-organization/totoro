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
      <Text>Participes à des missions</Text>
      <Text>Sois récompensé-e avec notre système de tokens</Text>
      <Text>Viens convertir tes tokens en bons de réduction</Text>

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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  gap: 1rem;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grey[900]};
  color: ${({ theme }) => theme.colors.white[600]};
`;
