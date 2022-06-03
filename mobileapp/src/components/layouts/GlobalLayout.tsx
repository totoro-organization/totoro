import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components/native";
import useAuth from "../../common/contexts/AuthContext";
import Spacer from "../atoms/Spacer";
import GoBackButton from "../molecules/GoBackButton";
import Header from "./subComponents/Header";

export type GlobalLayoutProps = PropsWithChildren<{
  withBackButton?: boolean;
  pageTitle?: string;
}>;

export default function GlobalLayout({
  children,
  pageTitle,
  withBackButton,
}: GlobalLayoutProps) {
  return (
    <Container>
      <Header title={pageTitle} />

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

// TODO: Create a common file?
export const layoutInnerSpaces = css`
  margin: 0 24px 24px 24px;
`;

const Container = styled.ScrollView`
  padding-top: 52px;
  min-height: 100%;
  background-color: #fcfcfc;
`;

const MainContainer = styled.ScrollView`
  ${layoutInnerSpaces}
`;
