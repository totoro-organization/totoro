import React from "react";
import Svg, { Path } from "react-native-svg";
import theme from "../../theme/theme";

type CheckProps = {
  color?: keyof typeof theme.colors;
  size?: number;
};

export default function Check({ color = "grey", size = 16 }: CheckProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 12L9.99529 16L18 8"
        stroke={theme.colors[color][500]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
