import { useState, useEffect } from 'react'

let io
export function getIntersectionObserver(cb, options) {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    'IntersectionObserver' in window
  ) {
    io = new window.IntersectionObserver(cb, options)
  }

  return io
}

export default function useIntersectionObserver(target, options) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const observer = getIntersectionObserver(e => setEntries(e), options)

    if (!observer) {
      return undefined
    }

    observer.observe(target.current)

    return () => {
      observer.unobserve(target.current)
    }
  }, [target])

  return entries
}
