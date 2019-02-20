import { useState } from 'react'

export default function useToggle(defaultState = false) {
  const [state, setState] = useState(defaultState)
  return [state, () => setState(on => !on)]
}
