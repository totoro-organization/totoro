import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import styled from "styled-components/native";
import { AuthParamList } from "../../navigation/StackNavigationParams";
import Button from "../atoms/Button";
import Spacer from "../atoms/Spacer";
import Carousel from "../molecules/Carousel";

export default function ExplanationCarousel() {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
  const [index, setIndex] = useState<number>(0);
  const lastStep = index === explanationSteps.length - 1;

  function handlePreviousItem() {
    setIndex(index + 1);
  }

  return (
    <>
      <Carousel data={explanationSteps} carouselIndex={index} />

      <ButtonWrapper $direction={lastStep ? "row" : "column"}>
        {!lastStep && (
          <Button horizontalPosition="center" onPress={handlePreviousItem}>
            Suivant
          </Button>
        )}

        {lastStep && (
          <>
            <Button
              variant="outline"
              horizontalPosition="stretch"
              onPress={() => navigation.navigate("Se connecter")}
            >
              Se connecter
            </Button>

            <Spacer axis="horizontal" size={0.5} />

            <Button
              horizontalPosition="center"
              onPress={() => navigation.navigate("S'inscrire")}
            >
              S'inscrire
            </Button>
          </>
        )}
      </ButtonWrapper>
    </>
  );
}

const ButtonWrapper = styled.View<{ $direction: "row" | "column" }>`
  width: 100%;
  flex-direction: ${({ $direction }) => $direction};
  padding: 0 ${({ theme }) => theme.spacing[6]}
    ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
`;

// DATA
const explanationSteps = [
  {
    title: "Participes à des missions en bénévolat.",
    text: "Totoro te propose de participer à des actions proposées par les associations le plus proche de chez toi.",
  },
  {
    title: "Sois récompensé-e avec notre système de tokens.",
    text: "Dès qu’une de tes missions est terminée, tu peux récupérer des tokens grâce au code de validation liée à la mission !",
  },
  {
    title: "Viens convertir tes tokens en bons de réduction !",
    text: "Totoro est en partenariat avec des boutiques locales de ton secteur, tu peux donc échanger tes tokens pour des bons de réduction ou avantages.",
  },
];
