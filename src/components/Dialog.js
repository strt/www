import React, { useRef, useContext } from 'react'
import styled from 'styled-components'
import { useTransition, animated, config } from 'react-spring'
import Portal from './Portal'
import { useFocusTrap, useLockScroll } from '../utils/hooks'
import { vw, breakpoints } from '../style'

const StyledDialogOverlay = styled.div`
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background-color: rgba(0, 0, 0, 0.8);
`

const StyledDialogContent = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 94%;
  max-width: 480px;
  margin: auto;
  outline: none;
  background-color: white;
  box-shadow: 0 30px 40px 10px #0b101e33;

  @media ${breakpoints.large} {
    width: 100%;
    max-width: ${vw(624)};
  }
`

export const DialogRow = styled.div`
  padding-right: ${vw(56)};
  padding-left: ${vw(56)};
`

const AnimatedDialogOverlay = animated(StyledDialogOverlay)
const AnimatedDialogContent = animated(StyledDialogContent)

const FocusContext = React.createContext()

function DialogOverlay({ onDismiss, initialFocusRef, ...props }) {
  const overlayRef = useRef()
  const contentRef = useRef()
  useFocusTrap({ initialFocusRef, overlayRef, contentRef })

  return (
    <FocusContext.Provider value={contentRef}>
      <AnimatedDialogOverlay
        ref={overlayRef}
        onClick={(event) => {
          event.stopPropagation()
          onDismiss()
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation()
            onDismiss()
          }
        }}
        {...props}
      />
    </FocusContext.Provider>
  )
}

export function DialogContent({ onClick, onKeyDown, ...props }) {
  const contentRef = useContext(FocusContext)

  return (
    <AnimatedDialogContent
      ref={contentRef}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        event.stopPropagation()
      }}
      {...props}
    />
  )
}

export default function Dialog({ isOpen, onDismiss, ...props }) {
  useLockScroll(isOpen)
  const transitions = useTransition(isOpen, p => p, {
    unique: true,
    from: { opacity: 0, transform: `translate3d(0, 24px, 0) scale(0.98)` },
    enter: { opacity: 1, transform: `translate3d(0, 0, 0) scale(1)` },
    leave: {
      opacity: 0,
      transform: `translate3d(0, 8px, 0) scale(0.98)`,
      pointerEvents: 'none',
    },
    config: { ...config.stiff, tension: 300 },
  })

  return transitions.map(
    ({ item: show, props: { transform, ...style }, key }) =>
      show && (
        <Portal key={key}>
          <DialogOverlay onDismiss={onDismiss} style={style}>
            <DialogContent style={{ transform }} {...props} />
          </DialogOverlay>
        </Portal>
      ),
  )
}
