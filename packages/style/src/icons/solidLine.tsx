import { Icon } from '@arco-design/web-react'
import { IconProps } from './type'

export default function SolidLineIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      viewBox="0 0 1024 1024">
      <path d="M960 512H64V448h896v64z"></path>
    </Icon>
  )
}
