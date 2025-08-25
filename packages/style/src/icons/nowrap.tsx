import { Icon } from '@arco-design/web-react'
import { IconProps } from './type'

export default function NowrapIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      viewBox="0 0 1024 1024">
      <path d="M896 213.333333H128v85.333334h768V213.333333M128 810.666667h298.666667v-85.333334H128v85.333334m0-256h640c42.666667 0 85.333333 18.346667 85.333333 85.333333s-42.666667 85.333333-85.333333 85.333333h-85.333333v-85.333333l-170.666667 128 170.666667 128v-85.333333h85.333333c125.866667 0 170.666667-54.186667 170.666667-170.666667 0-116.053333-42.666667-170.666667-170.666667-170.666667H128v85.333334z"></path>
      <line
        x1="128"
        y1="128"
        x2="896"
        y2="896"
        stroke="currentColor"
        strokeWidth="80"></line>
    </Icon>
  )
}
