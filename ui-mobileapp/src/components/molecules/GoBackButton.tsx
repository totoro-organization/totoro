import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import theme from "../../theme/theme";
import Icon from "../atoms/Icon/Icon";

export default function GoBackButton() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container onPress={handleGoBack} underlayColor={theme.colors.grey[300]}>
      <Icon name="arrow" />
    </Container>
  );
}

const Container = styled.TouchableHighlight`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grey[100]};
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.border.radius.circle};
`;
