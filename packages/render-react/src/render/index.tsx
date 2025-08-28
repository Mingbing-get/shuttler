import { useRootEditorId } from '../hooks'

export default function ShuttlerRender() {
  const rootEditorId = useRootEditorId()

  return <span>{rootEditorId}</span>
}
