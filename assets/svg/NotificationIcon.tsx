import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const ASPECT = 16 / 14;

function NotificationIcon(props) {

  return (
    <Svg {...props} width={props.width} height={props.width * ASPECT} viewBox="0 0 14 16">
      <Path
        d="M13.633 10.565l-1.401-1.447V5.55C12.271 2.81 10.337.46 7.701.046a5.154 5.154 0 00-4.142 1.289 5.456 5.456 0 00-1.791 4.047v3.736L.367 10.565c-.36.376-.466.937-.27 1.424.198.487.66.805 1.173.808h2.616v.272c.075 1.691 1.468 3 3.114 2.928 1.646.072 3.039-1.237 3.114-2.928v-.272h2.616a1.277 1.277 0 001.172-.808 1.339 1.339 0 00-.269-1.424zM8.557 13.07c-.09.8-.776 1.385-1.557 1.328-.781.057-1.467-.528-1.557-1.328v-.272h3.114v.272zm-6.61-1.872l.919-.943c.294-.301.46-.71.46-1.136V5.382c0-1.092.46-2.13 1.26-2.848a3.573 3.573 0 012.912-.936c1.862.31 3.217 1.982 3.177 3.92v3.6c-.003.425.16.834.451 1.136l.927.943H1.947z"
        fill="#FFF"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default NotificationIcon
