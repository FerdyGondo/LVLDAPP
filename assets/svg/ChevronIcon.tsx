import React from "react";
import Svg, { Path, Circle } from "react-native-svg"

type Prop = {
  width: number;
}

function ChevronIcon({ width }: Prop) {
  return (
    <Svg
      width={width}
      height={width}
      fill="none"
      viewBox="0 0 18 18"
    >
      <Circle cx="9" cy="9" r="8" stroke="#C29A41" strokeWidth="2"></Circle>
      <Path
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 8.5L7.5 12 13 6"
      ></Path>
    </Svg>
  );
}

export default ChevronIcon;