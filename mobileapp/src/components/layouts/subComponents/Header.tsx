import React from "react";
import styled from "styled-components/native";

import Button from "../../atoms/Button";
import { Text } from "../../atoms/Text";
import getLocaleCurrencyNotation from "../../../common/utils/getLocaleCurrencyNotation";
import { Pressable } from "react-native";
import Scanner from "../../../assets/icons/Scanner";
import Box from "../../atoms/Box";
import Spacer from "../../atoms/Spacer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../../navigation/StackNavigationParams";

type HeaderProps = {
  title?: string;
  withScanner?: boolean;
};

export default function Header({ title, withScanner }: HeaderProps) {
  const navigation = useNavigation<StackNavigationProp<AppParamList>>();

  return (
    <Container>
      {!title && (
        <Text weight="extraBold" size="xl">
          totoro
        </Text>
      )}

      {title && <Text size="xl">{title}</Text>}

      <Box alignItems="center">
        {withScanner && (
          <>
            <Pressable onPress={() => navigation.navigate("Scanner")}>
              <Scanner size={28} />
            </Pressable>

            <Spacer axis="horizontal" size={1} />
          </>
        )}

        <Button size="sm" color="primary" variant="outline">
          {/* TODO: Add real data. */}
          {getLocaleCurrencyNotation(9328)}
        </Button>
      </Box>
    </Container>
  );
}

const Container = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 0 24px 24px 24px;
`;
