import React, { createContext, useRef, useCallback } from 'react'

function generateId() {
  return Math.random()
    .toString(32)
    .substr(2, 6)
}

export const IdContext = createContext(generateId)

export function IdProvider(props) {
  const id = useRef(0)
  const genId = useCallback(() => {
    id.current += 1
    return id.current
  }, [id])

  return <IdContext.Provider value={genId}>{props.children}</IdContext.Provider>
}
