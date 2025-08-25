import { createContext } from 'react'

import { StyleVar } from '../type'

export interface StyleContext {
  styleVarMap?: Record<string, StyleVar.Desc>
}

export const styleContext = createContext<StyleContext>({})
