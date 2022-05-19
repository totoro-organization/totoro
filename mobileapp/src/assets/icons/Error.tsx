import React from "react";

import Svg, { Path } from "react-native-svg";
import theme from "../../theme/theme";

type ErrorProps = {
  color?: keyof typeof theme.colors;
  size?: number;
};

export default function Error({ color = "grey", size = 16 }: ErrorProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.9 2H9.10001C8.42001 2 7.46 2.4 6.98 2.88L2.88 6.98001C2.4 7.46001 2 8.42001 2 9.10001V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42001 22 9.10001 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.10001C22 8.42001 21.6 7.46001 21.12 6.98001L17.02 2.88C16.54 2.4 15.58 2 14.9 2Z"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 15.5L15.5 8.5"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.5 15.5L8.5 8.5"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
