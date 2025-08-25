export default function deepCompare(v1: any, v2: any): boolean {
  if (v1 === v2) return true

  if (v1 == null || v2 == null) return v1 === v2

  if (typeof v1 !== 'object' || typeof v2 !== 'object') return v1 === v2

  if (Array.isArray(v1) && Array.isArray(v2)) {
    if (v1.length !== v2.length) return false
    for (let i = 0; i < v1.length; i++) {
      if (!deepCompare(v1[i], v2[i])) return false
    }
    return true
  }

  const keys1 = Object.keys(v1)
  const keys2 = Object.keys(v2)

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (!Object.hasOwnProperty.call(v2, key) || !deepCompare(v1[key], v2[key])) {
      return false
    }
  }

  return true
}
