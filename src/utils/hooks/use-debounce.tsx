import { useEffect, useState } from "react"

const useDebounce = <T extends unknown>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
export default useDebounce

export const debounce = (fn: (query: string) => void, timeout = 1000) => {
  let timer: NodeJS.Timeout;
  const debounced = (...args: any) => {
      clearTimeout(timer);
      console.log('26jun23-09:57', timer);
      timer = setTimeout(() => {
          fn.apply(this, args);
      }, timeout);
      console.log('26jun23-09:58', timer);
  };
  return debounced;
};
