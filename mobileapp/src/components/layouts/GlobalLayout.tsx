import React, { PropsWithChildren, ReactNode } from "react";
import styled, { css } from "styled-components/native";
import Spacer from "../atoms/Spacer";
import GoBackButton from "../molecules/GoBackButton";
import Header from "./subComponents/Header";

export type GlobalLayoutProps = PropsWithChildren<{
  withBackButton?: boolean;

  withScanner?: boolean;
  header?: JSX.Element;
  pageTitle?: string;
  fullBanner?: ReactNode;
}>;

export default function GlobalLayout({
  children,
  pageTitle,
  fullBanner,
  withBackButton,
  withScanner = true,
  header,
}: GlobalLayoutProps) {
  return (
    <Container $withHeader={!header}>
      {header ? header : <Header title={pageTitle} withScanner={withScanner} />}

      {/* TODO: Add back button on Header component. */}
      {withBackButton && (
        <>
          <GoBackButton />
          <Spacer axis="vertical" size={1.5} />
        </>
      )}

      {fullBanner && (
        <>
          {fullBanner}
          <Spacer axis="vertical" size={1.5} />
        </>
      )}

      <MainContainer>{children}</MainContainer>

      {/* NOTE: To fix space between the button and the bottom of the page. */}
      <Spacer axis="vertical" size={5} />
    </Container>
  );
}

const Container = styled.ScrollView<{ $withHeader: boolean }>`
  padding-top: ${({ $withHeader }) => ($withHeader ? "52px" : "0")}
  min-height: 100%;
  background-color: #fcfcfc;
`;

const MainContainer = styled.ScrollView`
  margin: 0 24px 24px 24px;
`;
