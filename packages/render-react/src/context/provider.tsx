import { useEffect, useMemo, useRef, useState } from 'react'
import { ShuttlerState, StateManager, ShuttlerEnv } from '@shuttler/store'

import { ShuttlerStateContext, shuttlerStateContext } from '.'

interface Props {
  state?: ShuttlerState.Desc
  children?: React.ReactNode
}

export default function ShuttlerStateProvider({ state, children }: Props) {
  const stateManager = useRef(new StateManager())
  const [env, setEnv] = useState<ShuttlerEnv>({ isPreviewing: true })

  useEffect(() => {
    if (state) {
      stateManager.current.resetState(state)
    }
  }, [state])

  const contextValue = useMemo<ShuttlerStateContext>(
    () => ({
      stateManager: stateManager.current,
      env,
      setEnv,
    }),
    [env],
  )

  return (
    <shuttlerStateContext.Provider value={contextValue}>{children}</shuttlerStateContext.Provider>
  )
}
