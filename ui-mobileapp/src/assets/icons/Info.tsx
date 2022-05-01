import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export default function Info() {
  return (
    <Svg width="16px" height="16px" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 8V13"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Circle cx="12" cy="16" r="1" fill="currentColor" />
    </Svg>
  );
}
