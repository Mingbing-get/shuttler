import { Icon } from '@arco-design/web-react'
import { IconProps } from './type'

export default function DirectionRowIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      viewBox="0 0 1024 1024">
      <rect
        x="100"
        y="337"
        width="200"
        height="350"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="412"
        y="337"
        width="200"
        height="350"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="724"
        y="337"
        width="200"
        height="350"
        rx="25"
        fill="currentColor"
      />
    </Icon>
  )
}
