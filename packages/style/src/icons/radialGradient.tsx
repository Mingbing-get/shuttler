import { Icon } from '@arco-design/web-react'
import { IconProps } from './type'

export default function RadialGradientIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      viewBox="0 0 1024 1024">
      <circle
        cx="511.5"
        cy="511.5"
        r="362.5"
        fill="url(#paint0_radial_45_228)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_45_228"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(511.5 511.5) rotate(90) scale(362.5)">
          <stop
            offset="0.25"
            stop-color="#D9D9D9"
          />
          <stop
            offset="1"
            stop-color="currentColor"
          />
        </radialGradient>
      </defs>
    </Icon>
  )
}
