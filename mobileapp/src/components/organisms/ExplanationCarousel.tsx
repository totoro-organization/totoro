import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { AuthParamList } from "../../navigation/StackNavigationParams";
import Box from "../atoms/Box";
import Button from "../atoms/Button";
import Spacer from "../atoms/Spacer";
import Carousel from "../molecules/Carousel";

export default function ExplanationCarousel() {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const lastStep = carouselIndex === explanationSteps.length - 1;

  function handlePreviousItem() {
    setCarouselIndex(carouselIndex + 1);
  }

  return (
    <>
      <Carousel data={explanationSteps} carouselIndex={carouselIndex} />

      <Box alignItems="center" justifyContent="center">
        {explanationSteps.map((_, index) => (
          <Fragment key={index}>
            <Dot $active={carouselIndex === index} />

            <Spacer axis="horizontal" size={0.5} />
          </Fragment>
        ))}
      </Box>

      <Spacer axis="vertical" size={2} />

      <ButtonWrapper $direction={lastStep ? "row" : "column"}>
        {!lastStep && (
          <Button
            horizontalPosition="center"
            onPress={handlePreviousItem}
            testID="button-next"
          >
            Suivant
          </Button>
        )}

        {lastStep && (
          <>
            <Button
              variant="outline"
              onPress={() => navigation.navigate("Se connecter")}
              testID="button-login"
            >
              Se connecter
            </Button>

            <Button
              onPress={() => navigation.navigate("S'inscrire")}
              testID="button-register"
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
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing[6]}
    ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
`;

const Dot = styled.View<{ $active?: boolean }>`
  width: ${({ $active }) => ($active ? "12px" : "8px")};
  height: ${({ $active }) => ($active ? "12px" : "8px")};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.core.black.base : theme.colors.v1.grey[300]};
  border-radius: ${({ theme }) => theme.border.radius.circle};
`;

// DATA
const explanationSteps = [
  {
    image: require(`../../assets/illustrations/MissionIllustration.png`),
    title: "Participes ?? des missions en b??n??volat.",
    text: "Totoro te propose de participer ?? des actions propos??es par les associations le plus proche de chez toi.",
  },
  {
    image: require(`../../assets/illustrations/EarnTokensIllustration.png`),
    title: "Sois r??compens??-e avec notre syst??me de tokens.",
    text: "D??s qu???une de tes missions est termin??e, tu peux r??cup??rer des tokens gr??ce au code de validation li??e ?? la mission !",
  },
  {
    image: require(`../../assets/illustrations/DiscountCouponsIllustration.png`),
    title: "Viens convertir tes tokens en bons de r??duction !",
    text: "Totoro est en partenariat avec des boutiques locales de ton secteur, tu peux donc ??changer tes tokens pour des bons de r??duction ou avantages.",
  },
];
