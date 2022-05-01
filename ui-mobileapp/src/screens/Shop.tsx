import React from "react";
import { Text } from "../components/atoms/Text";
import MainLayout from "../components/layouts/MainLayout";
import ShopCard from "../components/molecules/ShopCard";
import styled from "styled-components/native";

const FAKE_DISCOUNTS = [
  {
    shopName: "Mademoiselle Vrac",
    description: "-50% sur les articles de cuisine",
    isObtained: true,
    tokens: 20,
  },
  {
    shopName: "HUTTE",
    description: "-10% sur tous les articles",
    isObtained: false,
    tokens: 5,
  },
];

export default function Shop() {
  return (
    <MainLayout>
      <Text>Shop</Text>

      <ShopCardsWrapper>
        {FAKE_DISCOUNTS.map((discount, index) => {
          return <ShopCard key={index} discount={discount} />;
        })}
      </ShopCardsWrapper>
    </MainLayout>
  );
}

const ShopCardsWrapper = styled.View`
  display: flex;
  /* gap: 8px; */
`;
