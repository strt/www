import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const useForceUpdate = () => useState()[1]

export default function Portal({ children, type = 'portal' }) {
  const node = useRef()
  const forceUpdate = useForceUpdate()

  useLayoutEffect(() => {
    node.current = document.createElement(type)
    document.body.appendChild(node.current)
    forceUpdate()

    return () => {
      document.body.removeChild(node.current)
    }
  }, [])

  return node.current ? createPortal(children, node.current) : null
}
