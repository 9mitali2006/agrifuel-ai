import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initialValue
    } catch {
      // localStorage unavailable or corrupted — fall back to default.
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silently ignore write failures (e.g. private browsing quota limits).
    }
  }, [key, value])

  const reset = () => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* noop */
    }
    setValue(initialValue)
  }

  return [value, setValue, reset] as const
}
