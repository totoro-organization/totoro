import React from "react";
import styled from "styled-components/native";
import { Colors, getColors } from "../../theme/utils";

type Position = "flex-start" | "center" | "flex-end";
type JustifySpace =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-around"
  | "space-between"
  | "space-evenly";

type BoxProps = {
  children: React.ReactNode;
  display?: "flex" | "block" | "none";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems?: Position;
  alignContent?: Position;
  justifyContent?: JustifySpace;
  height?: string;
  width?: string;
  padding?: number;
  margin?: number;
  color?: Colors;
  className?: string;
};

export default function Box(props: BoxProps) {
  const { children } = props;

  return <StyledBox {...props}>{children}</StyledBox>;
}

const StyledBox = styled.View<BoxProps>`
  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  align-items: ${({ alignItems }) => alignItems || "flex-start"};
  align-content: ${({ alignContent }) => alignContent || "flex-start"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  height: ${({ height }) => `${height}` || null};
  width: ${({ width }) => `${width}` || null};
  padding: ${({ padding }) => (padding ? `${padding * 16}px` : "0")};
  margin: ${({ margin }) => (margin ? `${margin * 16}px` : "0")};
  color: ${({ theme, color }) =>
    (color && getColors(color)) || theme.colors.core.black};
`;
