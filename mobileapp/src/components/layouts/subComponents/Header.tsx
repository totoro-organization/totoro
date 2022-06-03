import React from "react";
import styled from "styled-components/native";
import { User } from "../../../models/user";
import Button from "../../atoms/Button";
import { Text } from "../../atoms/Text";
import { layoutInnerSpaces } from "../GlobalLayout";
import getLocaleCurrencyNotation from "../../../common/utils/getLocaleCurrencyNotation";

type HeaderProps = {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <Container>
      {!title && (
        <Text weight="extraBold" size="xl">
          totoro
        </Text>
      )}

      {title && <Text>{title}</Text>}

      <Button size="sm" color="primary" variant="outline">
        {/* TODO: Add real data. */}
        {getLocaleCurrencyNotation(9328)}
      </Button>
    </Container>
  );
}

const Container = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  ${layoutInnerSpaces}
`;
