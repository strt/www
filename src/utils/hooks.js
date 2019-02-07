import { useState, useRef, useEffect } from 'react'
import createFocusTrap from 'focus-trap'

export function useForceUpdate() {
  const [, setState] = useState(true)
  return () => setState(i => !i)
}

export function useLockScroll(shouldLock = true) {
  useEffect(() => {
    if (shouldLock) {
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      document.body.style.setProperty('overflow', null)
    }

    return () => {
      document.body.style.setProperty('overflow', null)
    }
  }, [shouldLock])
}

export function useFocusTrap({
  initialFocusRef,
  overlayRef,
  contentRef,
  isOpen,
}) {
  const focusTrap = useRef()

  useEffect(() => {
    focusTrap.current = createFocusTrap(overlayRef.current, {
      initialFocus: initialFocusRef ? () => initialFocusRef.current : undefined,
      fallbackFocus: contentRef.current,
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
    })
    focusTrap.current.activate()

    return () => {
      focusTrap.current.deactivate()
    }
  }, [overlayRef, contentRef, initialFocusRef, isOpen])

  return focusTrap
}
