import React from "react";

import Svg, { Path } from "react-native-svg";
import theme from "../../theme/theme";

type ArrowProps = {
  color?: keyof typeof theme.colors;
  size?: number;
};

export default function Arrow({ color = "grey", size = 16 }: ArrowProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.57 5.93005L3.5 12.0001L9.57 18.0701"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.4999 12H3.66992"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
