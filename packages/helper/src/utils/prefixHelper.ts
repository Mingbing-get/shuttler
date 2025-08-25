type PathKey = string | number

export function isPrefixPath(prefixPath: PathKey[], fullPath: PathKey[]) {
  if (prefixPath.length > fullPath.length) return false

  for (let i = 0; i < prefixPath.length; i++) {
    if (prefixPath[i] !== fullPath[i]) return false
  }

  return true
}

export function isTwoWayPrefix(prefixPath: PathKey[], fullPath: PathKey[]) {
  return isPrefixPath(prefixPath, fullPath) || isPrefixPath(fullPath, prefixPath)
}
