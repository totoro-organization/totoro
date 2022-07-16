import React from "react";
import { ImageBackground } from "react-native";
import Toast from "react-native-toast-message";
import styled from "styled-components/native";
import Box from "../atoms/Box";
import Button from "../atoms/Button";
import { Text } from "../atoms/Text";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80";

// TODO: Add real types (see with the backend).
type Discount = {
  shopName: string;
  description: string;
  tokens: number;
  banner?: any;
  isObtained: boolean;
};

export type ShopCardProps = {
  discount: Discount;
};

export default function ShopCard({ discount }: ShopCardProps) {
  // TODO: Add api call here.
  function handleBuyDiscount(shopName: string) {
    Toast.show({
      type: "success",
      props: {
        title: "Félicitations !",
        text: `Le bon de réduction de chez ${shopName} a bien été acheté.`,
      },
    });
  }

  return (
    <Container>
      <InfoWrapper>
        <StyledImage
          source={{ uri: PLACEHOLDER_IMAGE as any }}
          resizeMode="cover"
        >
          <Overlay />

          <Box display="flex" flexDirection="column" padding={0.875}>
            <Text size="lg" color="white" weight="semiBold">
              {discount.shopName}
            </Text>
            <Text size="sm" color="white">
              {discount.description}
            </Text>
          </Box>
        </StyledImage>
      </InfoWrapper>

      <StyledButton
        horizontalPosition="stretch"
        color={discount.isObtained ? "grey" : "primary"}
        disabled={discount.isObtained}
        handlePress={() => handleBuyDiscount(discount.shopName)}
      >
        {discount.isObtained
          ? "Déjà obtenu"
          : `Obtenir pour ${discount.tokens} tokens`}
      </StyledButton>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius.lg};
`;

const StyledButton = styled(Button)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const InfoWrapper = styled.View`
  position: relative;
  width: 100%;
  height: 160px;
  border-top-left-radius: ${({ theme }) => theme.border.radius.lg};
  border-top-right-radius: ${({ theme }) => theme.border.radius.lg};
`;

const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.core.black.base};
  opacity: 0.3;
`;

const StyledImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  border-top-left-radius: ${({ theme }) => theme.border.radius.lg};
  border-top-right-radius: ${({ theme }) => theme.border.radius.lg};
  overflow: hidden;
`;
