export function getElementToBodyPath(element: HTMLElement) {
  let cur: HTMLElement | null = element
  const path: HTMLElement[] = []

  while (cur && cur !== document.body) {
    path.unshift(cur)

    cur = cur.parentElement
  }

  return path
}

export function getElementToBodyZIndex(element: HTMLElement) {
  const path = getElementToBodyPath(element)

  for (const ele of path) {
    const styleMap = ele.computedStyleMap()
    const zIndex = styleMap.get('z-index')

    if (!isNaN(Number(zIndex))) {
      return Number(zIndex)
    }
  }

  return 0
}
