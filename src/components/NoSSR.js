import React, { useState, useEffect } from 'react'

function DefaultOnSSR() {
  return null
}

export default function NoSSR({ children, onSSR = <DefaultOnSSR /> }) {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    setCanRender(true)
  }, [])

  return canRender ? children : onSSR
}
