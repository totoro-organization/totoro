import React from "react";
import GlobalLayout from "../components/layouts/GlobalLayout";
import ShopCard from "../components/molecules/ShopCard";
import styled from "styled-components/native";
import Spacer from "../components/atoms/Spacer";
import { ActivityIndicator, View } from "react-native";
import useDiscounts from "../common/api/hooks/useDiscounts";
import theme from "../theme/theme";

export default function Shop() {
  const { discounts, isLoading: discountsLoading } = useDiscounts();

  return (
    <GlobalLayout pageTitle="Boutique">
      {discountsLoading && (
        <ActivityIndicator color={theme.colors.brand.primary.base} />
      )}

      {!discountsLoading && (
        <ShopCardsWrapper>
          {discounts?.map((discount, index) => {
            return (
              <View key={`${discount.name}+${index}`}>
                <ShopCard discount={discount} />

                <Spacer axis="vertical" size={1} />
              </View>
            );
          })}
        </ShopCardsWrapper>
      )}
    </GlobalLayout>
  );
}

const ShopCardsWrapper = styled.View`
  display: flex;
`;
