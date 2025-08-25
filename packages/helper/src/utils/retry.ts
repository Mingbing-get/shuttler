export default function retry(fn: () => boolean) {
  let cancel = false
  loopWithRequestAnimationFrame(
    () => {
      if (!fn()) return

      cancel = true
    },
    () => cancel
  )

  return () => {
    cancel = true
  }
}

function loopWithRequestAnimationFrame(fn: () => void, end: () => boolean) {
  if (end()) return

  requestAnimationFrame(() => {
    fn()
    loopWithRequestAnimationFrame(fn, end)
  })
}
