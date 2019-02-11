import { useState, useRef, useEffect } from 'react'
import createFocusTrap from 'focus-trap'

export function useForceUpdate() {
  const [, setState] = useState(true)
  return () => setState(i => !i)
}

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

export function useFocusTrap(
  { initialFocusRef, overlayRef, contentRef },
  shouldTrap = true,
) {
  const focusTrap = useRef()

  useEffect(() => {
    focusTrap.current = createFocusTrap(overlayRef.current, {
      initialFocus: initialFocusRef ? () => initialFocusRef.current : undefined,
      fallbackFocus: contentRef.current,
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
    })
  }, [])

  useEffect(() => {
    if (shouldTrap) {
      focusTrap.current.activate()

      return () => {
        focusTrap.current.deactivate()
      }
    }

    return undefined
  }, [shouldTrap])

  return focusTrap
}
