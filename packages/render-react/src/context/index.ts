import { createContext } from 'react'

import { StateManager, ShuttlerEnv } from '@shuttler/store'

export interface ShuttlerStateContext {
  stateManager: StateManager
  env: ShuttlerEnv
  setEnv: React.Dispatch<React.SetStateAction<ShuttlerEnv>>
}

export const shuttlerStateContext = createContext<ShuttlerStateContext>({
  stateManager: new StateManager(),
  env: {
    isPreviewing: true,
  },
  setEnv: () => {},
})
