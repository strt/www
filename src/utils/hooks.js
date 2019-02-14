import { useState, useRef, useEffect } from 'react'
import createFocusTrap from 'focus-trap'
import ResizeObserver from 'resize-observer-polyfill'

export function useForceUpdate() {
  const [, setState] = useState(true)
  return () => setState(i => !i)
}

export function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}

export function useToggle(defaultState = false) {
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
