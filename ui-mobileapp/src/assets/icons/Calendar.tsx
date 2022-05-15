import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import theme from "../../theme/theme";

type CalendarProps = {
  color?: keyof typeof theme.colors;
  size?: number;
};

export default function Calendar({ color = "grey", size = 16 }: CalendarProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 2V5"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16 2V5"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.5 9.08997H20.5"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke={theme.colors[color][500]}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.6957 13.7H15.7047"
        stroke={theme.colors[color][500]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.6957 16.7H15.7047"
        stroke={theme.colors[color][500]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.9965 13.7H12.0054"
        stroke={theme.colors[color][500]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.9965 16.7H12.0054"
        stroke={theme.colors[color][500]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.29529 13.7H8.30427"
        stroke={theme.colors[color][500]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.29529 16.7H8.30427"
        stroke={theme.colors[color][500]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
