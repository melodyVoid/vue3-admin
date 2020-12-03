import * as ls from 'local-storage'
function generateKey(key: string): string {
  const prefix = 'admin-'
  return prefix + key
}

export default function useLocalStorage(
  key: string,
  defaultValue?: unknown
): [<T = string>() => T, (value: unknown) => void, () => void] {
  const customKey = generateKey(key)
  const getLocalValue = <T = string>(): T => {
    return ls.get<T>(customKey)
  }

  const setLocalValue = (value: unknown): void => {
    ls.set(customKey, value)
  }

  const removeLocalValue = (): void => {
    ls.remove(customKey)
  }

  // 如果给了默认值，并且 localStorage 里面没有值，就设置默认值
  if (defaultValue !== undefined && getLocalValue() === undefined) {
    setLocalValue(defaultValue)
  }

  return [getLocalValue, setLocalValue, removeLocalValue]
}
