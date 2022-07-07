import React from "react";
import Svg, { Path } from "react-native-svg";
import theme from "../../theme/theme";
import { IconProps } from "./types";

export default function Close({ color = "grey", size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 18L18 6"
        stroke={theme.colors.icon[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 18L6 6"
        stroke={theme.colors.icon[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
