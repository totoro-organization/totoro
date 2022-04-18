import React, { PropsWithChildren } from "react";
import styled from "styled-components/native";

export type MainLayoutProps = PropsWithChildren<{}>;

export default function MainLayout({ children }: MainLayoutProps) {
  return <Container>{children}</Container>;
}

const Container = styled.View`
  padding: 1.5rem;
  background-color: #fcfcfc;
  min-height: 100%;
`;
