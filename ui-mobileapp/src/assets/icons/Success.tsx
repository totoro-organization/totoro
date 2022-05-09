import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import theme from "../../theme/theme";

type SuccessProps = {
  color?: keyof typeof theme.colors;
  size?: number;
};

export default function Success({ color = "grey", size = 16 }: SuccessProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.75 12L10.58 14.83L16.25 9.16998"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
