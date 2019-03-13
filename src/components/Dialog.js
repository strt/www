import React, { useRef, useContext } from 'react'
import styled from 'styled-components'
import { useTransition, animated, config } from 'react-spring'
import Portal from './Portal'
import Div from './Div'
import Icon from './Icon'
import Button, { ButtonInner, IconButton } from './Button'
import useFocusTrap from '../lib/useFocusTrap'
import useDisableScroll from '../lib/useDisableScroll'
import { vw, breakpoints, colors, fluidRange } from '../style'

const FocusContext = React.createContext()

export function DialogOverlay({
  onDismiss,
  isOpen,
  initialFocusRef,
  ...props
}) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  useFocusTrap(overlayRef, {
    initialFocusRef,
    fallbackFocusRef: contentRef,
    shouldTrap: isOpen,
  })
  useDisableScroll(isOpen)

  return (
    <FocusContext.Provider value={contentRef}>
      <StyledDialogOverlay
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
    <StyledDialogContent
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

export default function Dialog({ isOpen, onDismiss, children, ...props }) {
  const transitions = useTransition(isOpen, null, {
    unique: true,
    from: { opacity: 0, transform: `translate3d(0, 24px, 0) scale(0.98)` },
    enter: {
      opacity: 1,
      transform: `translate3d(0, 0, 0) scale(1)`,
      pointerEvents: 'auto',
    },
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
          <DialogOverlay onDismiss={onDismiss} isOpen={isOpen} style={style}>
            <DialogContent style={{ transform }} {...props}>
              <DialogCloseButton onClick={onDismiss} />
              {children}
            </DialogContent>
          </DialogOverlay>
        </Portal>
      ),
  )
}

export function DialogButton(props) {
  return (
    <Button css={{ paddingLeft: 0, paddingRight: 0 }}>
      <DialogRow as={ButtonInner} {...props} />
    </Button>
  )
}

export function DialogCloseButton(props) {
  return (
    <DialogRow
      pt={[3, 5]}
      pb={[1, 1]}
      css={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <IconButton textColor={colors.dark} aria-label="Stäng" {...props}>
        <Icon name={['fal', 'times']} />
      </IconButton>
    </DialogRow>
  )
}

const StyledDialogOverlay = animated(styled.div`
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${fluidRange({ min: 24, max: 32 })} 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background-color: rgba(0, 0, 0, 0.8);

  @media ${breakpoints.medium} {
    padding: ${vw(32)} 0;
  }
`)

const StyledDialogContent = animated(styled.div`
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
`)

export const DialogRow = styled(Div)`
  padding-right: ${fluidRange({ min: 16, max: 24 })};
  padding-left: ${fluidRange({ min: 16, max: 24 })};

  @media ${breakpoints.medium} {
    padding-right: ${vw(56)};
    padding-left: ${vw(56)};
  }
`

export const DialogActions = styled(Div).attrs({ mt: [4, 8] })`
  display: flex;

  & > * {
    flex-grow: 1;
  }
`
