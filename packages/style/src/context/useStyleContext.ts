import { useContext } from 'react'

import { styleContext } from './base'

export default function useStyleContext() {
  return useContext(styleContext)
}
