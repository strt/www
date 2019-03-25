import { useRef, useEffect } from 'react'
import createFocusTrap from 'focus-trap'

export default function useFocusTrap(
  elementRef,
  { initialFocusRef, fallbackFocusRef, shouldTrap = true },
) {
  const focusTrap = useRef(null)

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
  }, [elementRef, fallbackFocusRef, initialFocusRef, shouldTrap])

  return focusTrap
}
