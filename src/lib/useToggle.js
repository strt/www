import { useState, useCallback } from 'react'

export default function useToggle(defaultState = false) {
  const [state, setState] = useState(defaultState)
  const toggle = useCallback(input => {
    setState(on => (input != null ? input : !on))
  }, [])

  return [state, toggle]
}
