import React, { PropsWithChildren } from "react";
import {
  Modal as RNModal,
  View,
  StyleSheet,
  ModalProps as RNModalProps,
} from "react-native";
import styled from "styled-components/native";

type ModalProps = PropsWithChildren<
  {
    onCloseModal: () => void;
  } & RNModalProps
>;

export default function Modal({ children, onCloseModal, ...rest }: ModalProps) {
  return (
    <RNModal
      animationType="slide"
      transparent
      style={StyleSheet.absoluteFillObject}
      {...rest}
    >
      <Container onPress={onCloseModal}>
        <InnerWrapper>{children}</InnerWrapper>
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

const InnerWrapper = styled.View`
  width: 80%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white[600]};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.border.radius.md};
`;
