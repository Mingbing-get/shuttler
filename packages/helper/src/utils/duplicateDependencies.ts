import { Dependency } from '../type'

export default function duplicateDependencies(deps: Dependency[]): Dependency[] {
  const uniqueKeys = new Set<string>()
  const uniqueDeps: Dependency[] = []

  for (const dep of deps) {
    const key = getDependencyKey(dep)
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key)
      uniqueDeps.push(dep)
    }
  }

  return uniqueDeps
}

function getDependencyKey(dep: Dependency): string {
  const { refType, sourceType, refPath, sourcePath } = dep
  const refPathKey = refPath.join('|')
  const sourcePathKey = sourcePath.map((item) => item.value).join('|')
  return `${refType}|${sourceType}|${refPathKey}|${sourcePathKey}`
}
