export default function updateUrlSearch(key: string, value: string) {
  const url = new URL(window.location.href)
  const searchParams = url.searchParams

  searchParams.set(key, value)
  history.replaceState('', '', url.href)
}
