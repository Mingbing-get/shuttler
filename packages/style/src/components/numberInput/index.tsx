import { InputNumber, InputNumberProps } from '@arco-design/web-react'

interface Props extends Omit<InputNumberProps, 'size'> {}

export default function NumberInput(props: Props) {
  return (
    <InputNumber
      {...props}
      size="mini"
    />
  )
}
