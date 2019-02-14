import { useState, useRef, useEffect } from 'react'
import createFocusTrap from 'focus-trap'

export function useForceUpdate() {
  const [, setState] = useState(true)
  return () => setState(i => !i)
}

export function useToggle(defaultState = true) {
  const [state, setState] = useState(defaultState)

  return [state, () => setState(on => !on)]
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
  elementRef,
  { initialFocusRef, fallbackFocusRef, shouldTrap = true },
) {
  const focusTrap = useRef()

  useEffect(() => {
    if (shouldTrap) {
      if (!focusTrap.current) {
        focusTrap.current = createFocusTrap(elementRef.current, {
          initialFocus: initialFocusRef
            ? () => initialFocusRef.current
            : undefined,
          fallbackFocus: fallbackFocusRef
            ? fallbackFocusRef.current
            : undefined,
          escapeDeactivates: false,
          clickOutsideDeactivates: false,
        })
      }

      focusTrap.current.activate()

      return () => {
        focusTrap.current.deactivate()
      }
    }

    return undefined
  }, [shouldTrap])

  return focusTrap
}
