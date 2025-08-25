import { Icon } from '@arco-design/web-react'
import { IconProps } from './type'

export default function GridIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      viewBox="0 0 1024 1024">
      <rect
        x="112"
        y="112"
        width="300"
        height="300"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="612"
        y="112"
        width="300"
        height="300"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="112"
        y="612"
        width="300"
        height="300"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="612"
        y="612"
        width="300"
        height="300"
        rx="25"
        fill="currentColor"
      />
    </Icon>
  )
}
