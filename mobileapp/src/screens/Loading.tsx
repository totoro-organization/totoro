import React from "react";
import styled from "styled-components/native";

export default function Loading() {
  return <Container>{/* <TextStyled>totoro!</TextStyled> */}</Container>;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const TextStyled = styled.Text`
  font-size: 24px;
`;
