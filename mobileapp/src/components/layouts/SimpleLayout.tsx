import React, { PropsWithChildren } from "react";
import styled from "styled-components/native";
import Spacer from "../atoms/Spacer";
import GoBackButton from "../molecules/GoBackButton";

export type SimpleLayoutProps = PropsWithChildren<{
  withBackButton?: boolean;
}>;

// TODO: Refactor me.
export default function SimpleLayout({
  children,
  withBackButton,
}: SimpleLayoutProps) {
  return (
    <Container>
      {withBackButton && (
        <>
          <GoBackButton />
          <Spacer axis="vertical" size={1.5} />
        </>
      )}

      <MainContainer>{children}</MainContainer>

      {/* NOTE: To fix space between the button and the bottom of the page. */}
      {/* TODO: Find a better way. */}
      <Spacer axis="vertical" size={5} />
    </Container>
  );
}

const Container = styled.ScrollView`
  padding-top: 52px;
  min-height: 100%;
  background-color: #fcfcfc;
`;

const MainContainer = styled.ScrollView`
  margin: 0 24px 24px 24px;
`;
