import * as React from "react"
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

interface Props {
    width?: number;
  }

const ASPECT = 30 / 80;

const LvldLogo= React.memo(
    ({ width = 80 }: Props): React.ReactElement => (
    <Svg width={width} height={width * ASPECT} viewBox="0 0 80 30">
      <Defs>
        <Path id="prefix__a" d="M0 30h80V0H0z" />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Path
          d="M68.86 9.643v9.408h1.296v-8.176h3.736c2.906 0 4.761 2.05 4.761 4.663v.033c0 2.608-1.855 4.632-4.761 4.632H68.86v1.226h5.03c3.613 0 6.109-2.576 6.109-5.89V15.5c0-3.315-2.496-5.858-6.108-5.858H68.86z"
          fill="#FFF"
        />
        <Mask id="prefix__b" fill="#fff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Path
          fill="#FFF"
          mask="url(#prefix__b)"
          d="M0 19.286h1.013V9.643H0zM11.14 21.429H0v-1.072l10.633.005zM22.51 9.643l3.82 9.259-.602 1.455-4.462-10.714zM32.405 9.643l-4.927 11.786H26.33l4.907-11.786zM46.582 19.286h1.013V9.643h-1.013zM57.722 21.429h-11.14v-1.072l10.634.005z"
        />
        <Path
          fill="#D2A747"
          mask="url(#prefix__b)"
          d="M0 30h80v-1.071H0zM0 1.071h80V0H0z"
        />
      </G>
    </Svg>
  )
);

LvldLogo.displayName = "LvldLogo";

export default LvldLogo;
