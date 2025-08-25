import { Icon } from '@arco-design/web-react'
import { IconProps } from './type'

export default function GridIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      viewBox="0 0 1024 1024">
      <rect
        x="180"
        y="120"
        width="300"
        height="300"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="544"
        y="120"
        width="300"
        height="300"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="180"
        y="604"
        width="300"
        height="300"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="544"
        y="604"
        width="300"
        height="300"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="88"
        y="37"
        width="48"
        height="950"
        fill="currentColor"
      />
      <rect
        x="888"
        y="37"
        width="48"
        height="950"
        fill="currentColor"
      />
    </Icon>
  )
}
