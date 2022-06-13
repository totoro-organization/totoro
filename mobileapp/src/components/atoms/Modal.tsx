import React, { PropsWithChildren } from "react";
import {
  Modal as RNModal,
  View,
  StyleSheet,
  ModalProps as RNModalProps,
} from "react-native";
import styled from "styled-components/native";
import Close from "../../assets/icons/Close";

type ModalProps = PropsWithChildren<
  {
    onCloseModal: () => void;
    center?: boolean;
  } & RNModalProps
>;

export default function Modal({
  children,
  center = true,
  onCloseModal,
  ...rest
}: ModalProps) {
  return (
    <RNModal
      animationType="none"
      transparent
      style={StyleSheet.absoluteFillObject}
      {...rest}
    >
      <Container onPress={onCloseModal}>
        <InnerWrapper $center={center}>
          <IconWrapper onPress={onCloseModal}>
            <Close size={24} />
          </IconWrapper>

          {children}
        </InnerWrapper>
      </Container>
    </RNModal>
  );
}

const Container = styled.Pressable`
  position: absolute;
  flex: 1;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #05011f31;
`;

const InnerWrapper = styled.View<{ $center?: boolean }>`
  position: relative;
  width: 90%;
  align-items: ${({ $center }) => ($center ? "center" : "flex-start")};
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white[600]};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.border.radius.md};
`;

const IconWrapper = styled.Pressable`
  position: absolute;
  top: 24px;
  right: 24px;
`;
