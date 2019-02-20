import { useEffect } from 'react'

export function useDisableScroll(shouldDisable = true) {
  useEffect(() => {
    if (shouldDisable) {
      document.body.style.setProperty('overflow', 'hidden')

      return () => {
        document.body.style.setProperty('overflow', null)
      }
    }

    return undefined
  }, [shouldDisable])
}
