import useEffectCallback from './useEffectCallback'

interface Options<T extends Record<string, any>, K extends keyof T> {
  value?: T
  changeKey: K
  keepKeys?: (keyof T)[]
  onChange: (value: T) => void
}

export default function useChangePart<T extends Record<string, any>, K extends keyof T>({ value, changeKey, keepKeys, onChange }: Options<T, K>) {
  const handleChange = useEffectCallback(
    (newV: T[K]) => {
      if (!keepKeys || !value) {
        onChange({ ...value, [changeKey]: newV } as T)
        return
      }

      const newValue: Record<any, any> = { [changeKey]: newV }
      keepKeys.forEach((key) => {
        newValue[key] = value[key]
      })

      onChange(newValue as T)
    },
    [value, changeKey, keepKeys, onChange]
  )

  return handleChange
}
