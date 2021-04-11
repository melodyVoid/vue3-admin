import * as ls from 'local-storage'
/**
 * 生产 key
 */
function generateKey(key: string): string {
  const prefix = 'admin-'
  return prefix + key
}

export default function useLocalStorage<T = string>(
  key: string,
  defaultValue?: unknown
): [() => T, (value: unknown) => void, () => void] {
  const customKey = generateKey(key)

  const setLocalValue = (value: unknown): void => {
    ls.set(customKey, value)
  }

  const getLocalValue = (): T => {
    // 如果给了默认值，并且 localStorage 里面没有值，就设置默认值
    if (defaultValue !== undefined && ls.get(customKey) === null) {
      setLocalValue(defaultValue)
    }
    return ls.get<T>(customKey)
  }

  const removeLocalValue = (): void => {
    ls.remove(customKey)
  }

  return [getLocalValue, setLocalValue, removeLocalValue]
}
