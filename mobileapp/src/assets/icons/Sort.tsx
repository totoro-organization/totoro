import React from "react";
import Svg, { Path } from "react-native-svg";
import theme from "../../theme/theme";

type SortProps = {
  color?: keyof typeof theme.colors;
  size?: number;
};

export default function Sort({ color = "grey", size = 16 }: SortProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7H21"
        stroke={theme.colors[color][500]}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M6 12H18"
        stroke={theme.colors[color][500]}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M10 17H14"
        stroke={theme.colors[color][500]}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
