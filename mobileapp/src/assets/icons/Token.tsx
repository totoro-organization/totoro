import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import theme from "../../theme/theme";

type TokenProps = {
  color?: keyof typeof theme.colors;
  size?: number;
};

export default function Token({ color = "grey", size = 16 }: TokenProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.9004 16.9C19.6004 14.2 19.6004 9.7 16.9004 7"
        stroke={theme.colors[color][500]}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.1002 7.10001C4.4002 9.80001 4.4002 14.3 7.1002 17"
        stroke={theme.colors[color][500]}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={theme.colors[color][500]}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
