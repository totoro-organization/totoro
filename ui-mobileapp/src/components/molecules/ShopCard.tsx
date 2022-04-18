import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Box from "../atoms/Box";
import Button from "../atoms/Button";
import { Text } from "../atoms/Text";

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
  return (
    <Container>
      <InfoWrapper>
        {/* TODO: Add discount banner */}
        <ImagePlaceholder />

        <Box display="flex" flexDirection="column" padding={0.875} gap={0.5}>
          <Text size="lg" color="white">
            {discount.shopName}
          </Text>
          <Text size="sm" color="white">
            {discount.description}
          </Text>
        </Box>
      </InfoWrapper>

      <StyledButton
        color={discount.isObtained ? "disable" : "primary"}
        disabled={discount.isObtained}
        // TODO: Add handlePress function to buy discount.
        handlePress={() => console.log("acheté !")}
      >
        {discount.isObtained
          ? "Obtenu"
          : `Obtenir pour ${discount.tokens} tokens`}
      </StyledButton>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  /* height: 10rem; */
  border-radius: ${({ theme }) => theme.border.radius.lg};
`;

const StyledButton = styled(Button)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const InfoWrapper = styled.View`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  height: 10rem;
  border-top-left-radius: ${({ theme }) => theme.border.radius.lg};
  border-top-right-radius: ${({ theme }) => theme.border.radius.lg};
`;

const ImagePlaceholder = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: grey;
  object-fit: cover;
  border-radius: inherit;
  z-index: -1;
`;
