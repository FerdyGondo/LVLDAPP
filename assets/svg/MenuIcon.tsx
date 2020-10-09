import * as React from "react"
import Svg, { Defs, Path, Use } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const ASPECT = 14 / 18;

function MenuIcon(props) {
  return (
    <Svg {...props} width={props.width} height={props.width * ASPECT} viewBox="0 0 18 14">
      <Defs>
        <Path
          d="M20 17a1 1 0 010 2H4a1 1 0 010-2h16zm0-6a1 1 0 010 2H4a1 1 0 010-2h16zm0-6a1 1 0 010 2H4a1 1 0 110-2h16z"
          id="prefix__a"
        />
      </Defs>
      <Use
        fill="#FFF"
        xlinkHref="#prefix__a"
        transform="translate(-3 -5)"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default MenuIcon
