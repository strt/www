import { useState, useCallback } from 'react'

export default function useForceUpdate() {
  const [, setState] = useState(false)
  const forceUpdate = useCallback(() => setState(i => !i), [])
  return forceUpdate
}
