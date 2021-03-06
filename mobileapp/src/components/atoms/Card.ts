import { PressableProps } from "react-native";
import styled from "styled-components/native";
import { border } from "../../theme/border";

export type CardProps = {
  rounded?: keyof typeof border.radius;
} & PressableProps;

// NOTE: Pressable use here instead of View because the card is an interactive button
export const Card = styled.Pressable<CardProps>`
  background-color: ${({ theme }) => theme.colors.core.white.light};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme, rounded }) =>
    rounded ? theme.border.radius[rounded] : theme.border.radius.md};
`;
