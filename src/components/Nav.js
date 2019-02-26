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
import { Grid, Column } from './Grid'
import useFocusTrap from '../lib/useFocusTrap'
import useDisableScroll from '../lib/useDisableScroll'
import useToggle from '../lib/useToggle'
import { colors, fluidRange, easings, durations } from '../style'

function getProps({ href, isPartiallyCurrent }) {
  return isPartiallyCurrent && href !== '/'
    ? { 'data-partially-current': true }
    : null
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
  transition: all ${durations.fast} ${easings.easeOutQuad};

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &.focus-visible,
  &[aria-current],
  &[data-partially-current] {
    outline: none;
    text-indent: ${fluidRange({ min: 24, max: 32 })};
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const NavContent = animated(styled.div`
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  right: var(--scrollbar-width);
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: ${colors.watermelonRed500};

  ${IconButton} {
    position: absolute;
    top: ${fluidRange({ min: 16, max: 26 })};
    right: 0;
    font-size: ${fluidRange({ min: 32, max: 40 })};
    color: white;
  }

  ul {
    margin: auto 0;
  }

  li {
    transform-origin: left center;
  }
`)

const NAV_ID = 'navigation'

export function Navigation({ children }) {
  const [isOpen, toggle] = useToggle(false)
  const navRef = useRef(null)
  useFocusTrap(navRef, { shouldTrap: isOpen })
  useDisableScroll(isOpen)

  const navSpringRef = useRef(null)
  const navAnimStyle = useSpring({
    ref: navSpringRef,
    config: { ...config.stiff, friction: 28 },
    from: {
      opacity: 0,
      translateY: 0,
    },
    to: {
      opacity: isOpen ? 1 : 0,
      translateY: isOpen ? 0 : -50,
    },
  })

  const childrenArray = React.Children.toArray(children)
  const itemsTransitionRef = useRef(null)
  const transitions = useTransition(
    isOpen ? childrenArray : [],
    item => item.key,
    {
      ref: itemsTransitionRef,
      unique: true,
      trail: 200 / childrenArray.length,
      from: { opacity: 0, scale: 0.8 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0.8 },
    },
  )

  useChain(
    isOpen
      ? [navSpringRef, itemsTransitionRef]
      : [itemsTransitionRef, navSpringRef],
    [0, isOpen ? 0.1 : 0],
  )

  return (
    <nav role="navigation">
      <Link
        as="button"
        type="button"
        colorVariant="red"
        variant="large"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={NAV_ID}
      >
        meny
      </Link>
      <NavContent
        id={NAV_ID}
        ref={navRef}
        style={{
          opacity: navAnimStyle.opacity,
          right: isOpen ? 'var(--scrollbar-width)' : null,
          visibility: navAnimStyle.opacity.interpolate(o =>
            o === 0 && !isOpen ? 'hidden' : 'visible',
          ),
          pointerEvents: navAnimStyle.opacity.interpolate(o =>
            o !== 1 ? 'none' : 'auto',
          ),
          transform: navAnimStyle.translateY.interpolate(
            y => `translate3d(0, ${y}%, 0)`,
          ),
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation()
            toggle()
          }
        }}
      >
        <Grid>
          <Column>
            <div css={{ position: 'relative' }}>
              <IconButton
                type="button"
                onClick={toggle}
                textColor="white"
                aria-label="Stäng meny"
              >
                <Icon name={['fal', 'times']} />
              </IconButton>
            </div>
          </Column>
        </Grid>
        <Grid my="auto">
          <Column>
            <ul>
              {transitions.map(({ key, item, props: itemStyle }) => (
                <animated.li
                  key={key}
                  style={{
                    opacity: itemStyle.opacity,
                    transform: itemStyle.scale.interpolate(
                      s => `scale3d(${s}, 1, 1)`,
                    ),
                  }}
                >
                  {item}
                </animated.li>
              ))}
            </ul>
          </Column>
        </Grid>
      </NavContent>
    </nav>
  )
}
