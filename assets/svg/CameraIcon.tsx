import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Prop = {
  width: number;
}

const ASPECT = 12 / 16;

function CameraIcon({ width }: Prop) {
  return (
    <Svg 
      width={width} 
      height={width * ASPECT} 
      viewBox="0 0 16 12"
      fill="none"
    >

      <Path
        d="M14.732 2.34H12.68L10.491 0H5.736L3.698 2.34h-2.43C.566 2.34 0 2.906 0 3.608v6.898c0 .701.566 1.268 1.268 1.268h13.464c.702 0 1.268-.566 1.268-1.268V3.608c0-.702-.566-1.268-1.268-1.268zM8 10.25a3.285 3.285 0 01-3.283-3.284A3.285 3.285 0 018 3.683a3.285 3.285 0 013.283 3.283A3.285 3.285 0 018 10.249zm6.793-6.492a.303.303 0 01-.302-.301c0-.166.135-.302.302-.302.166 0 .301.136.301.302a.298.298 0 01-.301.301z"
        fill="#fff"
        />
      <Path
        d="M8 9.494a2.528 2.528 0 100-5.056 2.528 2.528 0 000 5.056zM3.32 1.72a.37.37 0 00-.37-.369H1.66a.37.37 0 00-.37.37v.385h2.038V1.72h-.007z"
        fill="#fff"
      />
    </Svg>
  )
}
    
export default CameraIcon