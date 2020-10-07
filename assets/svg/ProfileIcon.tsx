import React from "react";
import Svg, { Path } from "react-native-svg"

type Prop = {
  width: number;
}

function ProfileIcon({ width }: Prop) {
  return (
    <Svg width={width} height={width} viewBox="0 0 56 56">
        <Path fill="#000" d="M17 3.1C-.1 10.8-4.5 33.3 8.3 46.9c10.3 10.8 29.1 10.8 39.4 0 10.1-10.7 9.7-28.6-.8-38.6C39.2 1 26.4-1.2 17 3.1zm23.5 3.3c5.4 3.2 10.1 9.2 11.6 15 1.4 5 .6 13.3-1.5 17.4l-1.6 3-6.5-3.1C38.9 37 36 35.2 36 34.8c0-.5.9-2.7 2-4.8 1.8-3.5 1.9-4.7 1-10.2-1.3-8.5-3.3-10.3-11-10.3s-9.7 1.8-11 10.3c-.9 5.5-.8 6.7 1 10.3 1.2 2.2 2 4.5 1.8 5-.2.5-3.1 2.2-6.5 3.9L7 41.9l-1.7-3.2C4.1 36.5 3.5 33.2 3.5 28c0-6.4.4-8.2 2.8-12.2C11.5 7 19.5 2.7 29.7 3.4c4.4.2 7.5 1.1 10.8 3z" />
    </Svg>
  );
}

export default ProfileIcon;