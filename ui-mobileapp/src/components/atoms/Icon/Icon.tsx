import React from "react";
import Missions from "../../../assets/icons/Missions";
import styled from "styled-components/native";
import { Colors, getColors } from "../../../theme/utils";
import Shop from "../../../assets/icons/Shop";
import Message from "../../../assets/icons/Message";
import User from "../../../assets/icons/User";

export enum IconName {
  missions = "missions",
  shop = "shop",
  message = "message",
  user = "user",
}

const ICONS: Record<IconName, JSX.Element> = {
  missions: <Missions />,
  shop: <Shop />,
  message: <Message />,
  user: <User />,
} as const;

export type IconProps = {
  name: keyof typeof IconName;
  color?: Colors;
  size?: number;
  // NOTE: To be overload with styled-components.
  className?: string;
};

export default function Icon({ name, color, size, ...rest }: IconProps) {
  return (
    <Wrapper {...rest} color={color} size={size}>
      {ICONS[name]}
    </Wrapper>
  );
}

const Wrapper = styled.View<Pick<IconProps, "color" | "size">>`
  font-size: ${({ size }) => (size && `${size * 16}px`) || "24px"};
  color: ${({ color, theme }) =>
    (color && getColors(color)) || theme.colors.grey[400]};
`;
