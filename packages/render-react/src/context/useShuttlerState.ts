import { useContext } from 'react'

import { shuttlerStateContext } from '.'

export default function useShuttlerState() {
  const { stateManager } = useContext(shuttlerStateContext)

  return stateManager
}
