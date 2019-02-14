import React, { useRef } from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import {
  useSpring,
  useTransition,
  useChain,
  config,
  animated,
} from 'react-spring'
import { IconButton } from './Button'
import Link from './Link'
import Icon from './Icon'
import { useFocusTrap, useDisableScroll, useToggle } from '../utils/hooks'
import { colors, fluidRange } from '../style'

function getProps({ href, isPartiallyCurrent }) {
  return isPartiallyCurrent && href !== '/' ? { 'data-active': true } : null
}

export function NavLink(props) {
  return <StyledNavLink getProps={getProps} {...props} />
}

export const StyledNavLink = styled(GatsbyLink)`
  display: inline-block;
  margin-bottom: ${fluidRange({ min: 8, max: 12 })};
  font-size: ${fluidRange({ min: 36, max: 48 })};
  line-height: 1.2777777778em;
  font-weight: 700;
  text-decoration: none;
  color: white;

  &:last-child {
    margin-right: 0;
  }

  &[aria-current],
  &[data-active] {
    text-indent: ${fluidRange({ min: 24, max: 32 })};
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const Nav = animated(styled.nav`
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: ${fluidRange({ min: 48, max: 56 })};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${colors.watermelonRed};

  ${IconButton} {
    position: absolute;
    top: ${fluidRange({ min: 24, max: 32 })};
    right: ${fluidRange({ min: 24, max: 32 })};
    font-size: ${fluidRange({ min: 32, max: 40 })};
    color: white;
  }

  li {
    transform-origin: left center;
  }
`)

export function Navigation({ children }) {
  const [isOpen, toggle] = useToggle(false)

  const navRef = useRef()

  const springRef = useRef()
  const navAnimationStyle = useSpring({
    ref: springRef,
    config: { ...config.stiff, friction: 28 },
    from: {
      opacity: 0,
      pointerEvents: 'none',
    },
    to: {
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'auto' : 'none',
      // visibility: isOpen ? 'visible' : 'hidden',
      transform: isOpen ? 'translate3d(0,0,0)' : 'translate3d(0,-50%, 0)',
    },
  })

  const childrenArray = React.Children.toArray(children)
  const transRef = useRef()
  const transitions = useTransition(
    isOpen ? childrenArray : [],
    item => item.key,
    {
      ref: transRef,
      unique: true,
      trail: 200 / childrenArray.length,
      from: { opacity: 0, transform: 'scale(0.8)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0.8)' },
    },
  )

  useChain(isOpen ? [springRef, transRef] : [transRef, springRef], [
    0,
    isOpen ? 0.1 : 0,
  ])

  useFocusTrap(navRef, { shouldTrap: isOpen })
  useDisableScroll(isOpen)

  return (
    <>
      <Link
        as="button"
        type="button"
        textColor={colors.watermelonRed}
        onClick={toggle}
      >
        meny.
      </Link>
      <Nav
        ref={navRef}
        style={navAnimationStyle}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation()
            toggle()
          }
        }}
      >
        <IconButton
          type="button"
          onClick={toggle}
          textColor="white"
          aria-label="Stäng meny"
        >
          <Icon name={['fal', 'times']} />
        </IconButton>
        <ul>
          {transitions.map(transition => (
            <animated.li key={transition.key} style={transition.props}>
              {transition.item}
            </animated.li>
          ))}
        </ul>
      </Nav>
    </>
  )
}
