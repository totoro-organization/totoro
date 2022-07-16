import React from "react";

import styled from "styled-components/native";
import { Discount } from "../../models/discount";
import Box from "../atoms/Box";
import Spacer from "../atoms/Spacer";
import { Text } from "../atoms/Text";
import { Card } from "../atoms/Card";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../navigation/StackNavigationParams";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80";

export type ShopCardProps = {
  discount: Discount;
  isObtained?: boolean;
};

export default function ShopCard({
  discount,
  isObtained = false,
}: ShopCardProps) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Container
      onPress={() => navigation.navigate("Discount", { id: discount.id })}
    >
      <ShopBanner
        source={{
          uri: PLACEHOLDER_IMAGE,
        }}
        resizeMode="cover"
      />

      <Box display="flex" flexDirection="column" padding={1}>
        <Text size="lg">{discount.partner.name}</Text>

        <Spacer axis="vertical" size={0.5} />

        <Text size="sm" color="grey">
          {discount.description}
        </Text>
      </Box>
    </Container>
  );
}

const Container = styled(Card)`
  border: ${({ theme }) => theme.border.width[1]} solid
    ${({ theme }) => theme.colors.v1.grey[200]};
  padding: 0;
`;

const ShopBanner = styled.ImageBackground`
  width: 100%;
  height: 150px;
  border-top-left-radius: ${({ theme }) => theme.border.radius.md};
  border-top-right-radius: ${({ theme }) => theme.border.radius.md};
  overflow: hidden;
  position: relative;
`;
