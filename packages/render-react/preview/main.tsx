import { ShuttlerStateProvider, ShuttlerRender } from '..'

export default function Main() {
  return (
    <ShuttlerStateProvider>
      <ShuttlerRender />
    </ShuttlerStateProvider>
  )
}
