import { Dependency } from '@shuttler/helper'

import { isStyleExpression } from './styleExpression'

export function obtainStyleValueDependencies(value?: any) {
  const refDependencies: Pick<Dependency, 'refPath' | 'refType'>[] = []

  if (!isStyleExpression(value)) {
    return refDependencies
  }

  if (value.styleVarId) {
    refDependencies.push({
      refType: 'styleVar',
      refPath: [value.styleVarId],
    })
  }

  return refDependencies
}
