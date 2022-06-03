import React from "react";
import styled from "styled-components/native";
import { User } from "../../../models/user";
import Button from "../../atoms/Button";
import { Text } from "../../atoms/Text";
import { layoutInnerSpaces } from "../GlobalLayout";
import getLocaleCurrencyNotation from "../../../common/utils/getLocaleCurrencyNotation";

type HeaderProps = {
  title?: string;
  user: User;
};

export default function Header({ title, user }: HeaderProps) {
  return (
    <Container>
      {!title && (
        <Text weight="extraBold" size="xl">
          totoro
        </Text>
      )}

      {title && <Text>{title}</Text>}

      <Button size="sm" color="primary" variant="outline">
        {getLocaleCurrencyNotation(user.total_token)}
      </Button>
    </Container>
  );
}

const Container = styled.View`
  justify-content: space-between;
  flex-direction: row;
  ${layoutInnerSpaces}
`;
