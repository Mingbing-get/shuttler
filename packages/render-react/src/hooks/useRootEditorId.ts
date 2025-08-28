import { useEffect, useState } from 'react'

import useShuttlerState from '../context/useShuttlerState'

export default function useRootEditorId() {
  const state = useShuttlerState()
  const [rootId, setRootId] = useState(state.getRootId())

  useEffect(() => {
    const unsubscribe = state.on('changeRoot', ({ id }) => {
      setRootId(id)
    })

    return unsubscribe
  }, [state])

  return rootId
}
