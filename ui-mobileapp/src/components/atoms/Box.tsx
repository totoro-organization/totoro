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
type PlaceItems = "start" | "center" | "end";
type Flow = "row" | "column" | "dense" | "row dense" | "column dense";

type BoxProps = {
  children: React.ReactNode;
  display?: "flex" | "block" | "grid" | "none";
  position?: "absolute" | "relative" | "static";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems?: Position;
  alignContent?: Position;
  justifyContent?: JustifySpace;
  justifyItems?: Position;
  placeItems?: PlaceItems;
  gridAutoFlow?: Flow;
  height?: string;
  width?: string;
  padding?: number;
  margin?: number;
  gap?: number;
  color?: Colors;
  className?: string;
};

export default function Box(props: BoxProps) {
  const { children } = props;

  return <StyledBox {...props}>{children}</StyledBox>;
}

const StyledBox = styled.View<BoxProps>`
  display: ${({ display }) => display || "block"};
  position: ${({ display }) => display || "static"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  align-items: ${({ alignItems }) => alignItems || null};
  align-content: ${({ alignContent }) => alignContent || null};
  justify-content: ${({ justifyContent }) => justifyContent || null};
  justify-items: ${({ justifyItems }) => justifyItems || null};
  place-items: ${({ placeItems }) => placeItems || null};
  height: ${({ height }) => `${height}` || null};
  width: ${({ width }) => `${width}` || null};
  padding: ${({ padding }) => `${padding}rem` || null};
  margin: ${({ margin }) => `${margin}rem` || null};
  gap: ${({ gap }) => `${gap}rem` || null};
  grid-auto-flow: ${({ gridAutoFlow }) => `${gridAutoFlow}` || null};
  color: ${({ theme, color }) =>
    (color && getColors(color)) || theme.colors.grey[900]};
`;
