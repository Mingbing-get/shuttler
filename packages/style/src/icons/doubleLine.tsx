import { Icon } from '@arco-design/web-react'
import { IconProps } from './type'

export default function DoubleLineIcon(props: IconProps) {
  return (
    <Icon
      {...props}
      viewBox="0 0 1024 1024">
      <path d="M64 320h896v64H64V320z m0 320h896v64H64v-64z"></path>
    </Icon>
  )
}
