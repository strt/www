import React, { createContext, useRef, useCallback } from 'react'

function generateId() {
  return Math.random()
    .toString(32)
    .substr(2, 6)
}

export const IdContext = createContext(generateId)

export function IdProvider(props) {
  const id = useRef(0)
  const genId = useCallback(
    (prefix) => {
      id.current += 1
      return prefix ? `${prefix}-${id.current}` : id.current
    },
    [id],
  )

  return <IdContext.Provider value={genId}>{props.children}</IdContext.Provider>
}
