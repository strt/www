import { useEffect } from 'react'

export default function useDisableScroll(shouldDisable = true) {
  useEffect(() => {
    if (shouldDisable) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth

      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${scrollBarWidth}px`,
      )
      document.body.style.setProperty('margin-right', `${scrollBarWidth}px`)
      document.body.style.setProperty('overflow', 'hidden')

      return () => {
        document.body.style.setProperty('overflow', null)
        document.body.style.setProperty('margin-right', null)
        document.documentElement.style.setProperty('--scrollbar-width', 0)
      }
    }

    return undefined
  }, [shouldDisable])
}
