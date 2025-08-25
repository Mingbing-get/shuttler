import { Icon } from '@arco-design/web-react'
import { IconProps } from './type'

export default function SpaceAroundIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      viewBox="0 0 1024 1024">
      <rect
        x="188"
        y="337"
        width="150"
        height="350"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="438"
        y="337"
        width="150"
        height="350"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="688"
        y="337"
        width="150"
        height="350"
        rx="25"
        fill="currentColor"
      />
      <rect
        x="50"
        y="193"
        width="924"
        height="667"
        rx="40"
        stroke="currentColor"
        strokeWidth="96"
        fill="none"
      />
    </Icon>
  )
}
