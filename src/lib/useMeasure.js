import { useState, useRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export default function useMeasure() {
  const ref = useRef(null)
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [observer] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  )
  useEffect(() => {
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [observer])
  return [{ ref }, bounds]
}
