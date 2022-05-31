import React, { ReactNode } from "react";
import Toast from "react-native-toast-message";
import type { ToastConfigParams } from "react-native-toast-message";

import styled from "styled-components/native";

import { Text } from "./Text";

import Success from "../../assets/icons/Success";
import Error from "../../assets/icons/Error";
import Spacer from "./Spacer";

export function ToastAtom() {
  return <Toast config={toastConfig} />;
}

//
//  TOAST CONFIG
//

type ToastType = "success" | "error";

type ToastProps = {
  title?: string;
  text?: ReactNode;
  type: ToastType;
};

const ICONS: Record<ToastType, JSX.Element> = {
  success: <Success color="success" size={18} />,
  error: <Error color="error" size={18} />,
} as const;

const toastConfig: Record<ToastType, any> = {
  success: ({ props }: ToastConfigParams<ToastProps>) => (
    <BaseToast type="success" title={props.title} text={props.text} />
  ),
  error: ({ props }: ToastConfigParams<ToastProps>) => (
    <BaseToast type="error" title={props.title} text={props.text} />
  ),
};

const BaseToast = ({ title, text, type }: ToastProps) => {
  return (
    <Container>
      {/* FIXME */}
      {/* <TypeIndicator type={type} /> */}

      {ICONS[type]}

      <Spacer axis="horizontal" size={0.5} />

      <DetailsWrapper>
        {title && (
          <>
            <Text weight="semiBold">{title}</Text>
            <Spacer axis="vertical" size={0.25} />
          </>
        )}

        {text && <Text size="sm">{text}</Text>}
      </DetailsWrapper>
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  width: 95%;
  flex-direction: row;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white[600]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.border.radius.md};
  border: ${({ theme }) => theme.border.width[1]}
    ${({ theme }) => theme.colors.grey[100]};
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const DetailsWrapper = styled.View`
  flex-direction: column;
  padding-right: ${({ theme }) => theme.spacing[4]};
`;

// FIXME !!
// const TypeIndicator = styled.View<{ type: ToastType }>`
//   position: absolute;
//   width: 6px;
//   height: 100%;
//   background-color: ${({ theme, type }) => theme.colors[type][200]};
//   border-top-left-radius: ${({ theme }) => theme.border.radius.md};
//   border-bottom-left-radius: ${({ theme }) => theme.border.radius.md};
// `;
