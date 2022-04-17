import React from "react";
import Missions from "../../assets/icons/Missions";
import styled from "styled-components/native";
import { ThemeColors } from "../../theme/utils";

enum IconName {
  missions = "missions",
}

const ICONS: Record<IconName, JSX.Element> = {
  missions: <Missions />,
} as const;

export type IconProps = {
  name: keyof typeof IconName;
  color?: ThemeColors;
  size?: number;
};

export default function Icon({ name, color, size }: IconProps) {
  return (
    <Wrapper color={color} size={size}>
      {ICONS[name]}
    </Wrapper>
  );
}

const Wrapper = styled.View<Pick<IconProps, "color" | "size">>`
  // NOTE: The size of our icons are based on the font-size.
  font-size: ${({ size }) => (size && `${size}em`) || "1.5em"};
  width: fit-content;
  color: ${({ theme, color }) => theme.colors[color || "grey"][500]};
`;
