import { useEffect, useMemo, useState } from 'react'

import { styleContext, StyleContext } from './base'

export interface EasyCoderStyleProviderProps extends StyleContext {
  children?: React.ReactNode
}

export default function EasyCoderStyleProvider({ children, styleVarMap }: EasyCoderStyleProviderProps) {
  const [_styleVarMap, setStyleVarMap] = useState(styleVarMap)

  useEffect(() => {
    setStyleVarMap(styleVarMap)
  }, [styleVarMap])

  const contextValue: StyleContext = useMemo(
    () => ({
      styleVarMap: _styleVarMap,
    }),
    [_styleVarMap]
  )

  return <styleContext.Provider value={contextValue}>{children}</styleContext.Provider>
}
