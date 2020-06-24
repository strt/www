import React, { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router'
import {
  useSpring,
  useTransition,
  useChain,
  config,
  animated,
  interpolate,
} from 'react-spring'
import { IconButton } from './Button'
import Link, { A } from './Link'
import Icon from './Icon'
import { Grid, Column } from './Grid'
import {getActiveLangPath, isDefaultLanguage} from './SelectLanguage'
import useFocusTrap from '../lib/useFocusTrap'
import useDisableScroll from '../lib/useDisableScroll'
import useToggle from '../lib/useToggle'
import {
  colors,
  fluidRange,
  easings,
  durations,
  breakpoints,
  vw,
} from '../style'
import { mainNavigation } from '../routes'
import { ThemeContext } from '../context/ThemeContext'

function getProps({ href, isPartiallyCurrent }) {
  return isPartiallyCurrent && href !== '/'
    ? { 'data-partially-current': true }
    : null
}

const NavLink = styled(GatsbyLink)`
  display: inline-block;
  margin-bottom: ${fluidRange({ min: 8, max: 12 })};
  font-size: ${fluidRange({ min: 36, max: 48 })};
  line-height: 0.798611em;
  font-weight: 400;
  text-decoration: none;
  color: white;
  transition: all ${durations.fast} ${easings.easeOutQuad};
  -webkit-tap-highlight-color: transparent;

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

const AnimatedIconButton = animated(IconButton)

const NavWrapper = styled.nav`
  ${A} {
    text-decoration: none;
  }

  [data-responsive] {
    @media ${breakpoints.small} {
      display: none;
    }
  }

  [data-desktop] {
    display: none;

    @media ${breakpoints.small} {
      display: flex;
    }

    li {
      padding-right: ${vw(40)};

      &:last-child {
        padding-right: 0;
      }
    }
  }

  [data-cover] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: top right;
    background-color: ${colors.dark};
  }

  [data-content] {
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

    ${IconButton} {
      position: absolute;
      top: ${fluidRange({ min: 16, max: 32 })};
      right: ${fluidRange({ min: 4, max: 8 })};
      font-size: ${fluidRange({ min: 32, max: 40 })};
      color: white;
    }

    ul {
      margin: auto 0;
      padding-left: ${fluidRange({ min: 24, max: 32 })};
    }

    li {
      transform-origin: left center;
    }
  }
`

const NAV_ID = 'navigation'

function Navigation({ location }) {
  const [isOpen, toggle] = useToggle(false)
  const navRef = useRef(null)
  useFocusTrap(navRef, { shouldTrap: isOpen })
  useDisableScroll(isOpen)

  // Close nav on location change
  useEffect(() => {
    toggle(false)
  }, [location, toggle])

  // Update nprogress color
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty('--nprogress-color', 'white')

      return () => {
        document.documentElement.style.setProperty('--nprogress-color', null)
      }
    }

    return undefined
  }, [isOpen])

  const closeSpringRef = useRef(null)
  const closeAnimStyle = useSpring({
    ref: closeSpringRef,
    from: {
      opacity: 0,
      scale: 0,
    },
    to: {
      opacity: isOpen ? 1 : 0,
      scale: isOpen ? 1 : 0,
    },
  })

  const coverSpringRef = useRef(null)
  const coverAnimStyle = useSpring({
    ref: coverSpringRef,
    from: {
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      x: 0,
      y: 0,
    },
    to: {
      opacity: isOpen ? 1 : 0,
      scaleY: isOpen ? 1 : 0,
      scaleX: isOpen ? 1 : 0,
      x: isOpen ? 0 : -16,
      y: isOpen ? 0 : 16,
    },
  })

  const itemsTransitionRef = useRef(null)
  const transitions = useTransition(
    isOpen ? mainNavigation : [],
    item => item.id,
    {
      ref: itemsTransitionRef,
      unique: true,
      config: { ...config.default, friction: 30 },
      trail: 250 / mainNavigation.length,
      reverse: !isOpen,
      from: { opacity: 0, x: -40 },
      enter: { opacity: 1, x: 0 },
      leave: { opacity: 0, x: -12 },
    },
  )

  useChain(
    isOpen
      ? [coverSpringRef, itemsTransitionRef, closeSpringRef]
      : [closeSpringRef, itemsTransitionRef, coverSpringRef],
    isOpen ? [0, 0.1, 0.21] : [0, 0, 0.1],
  )

  return (
    <ThemeContext.Consumer>
      {theme => (
        <NavWrapper>
          <ul data-desktop>
            {mainNavigation
              .filter(child => child.link !== '/')
              .map(child => (
                <li key={child.id}>
                  <Link
                    to={`${getActiveLangPath()}/${child.link}`}
                    getProps={getProps}
                    textColor={theme.colorSecondary}
                    styleVariant={theme.theme}
                    variant="large"
                  >
                    {isDefaultLanguage() ? child.sv.title : child.title}
                  </Link>
                </li>
              ))}
          </ul>
          <div data-responsive>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link
                style={{ marginTop: '-8px' }}
                as="button"
                type="button"
                styleVariant={theme.theme}
                textColor={theme.colorSecondary}
                variant="large"
                onClick={() => {
                  toggle()
                }}
                aria-expanded={isOpen}
                aria-controls={NAV_ID}
              >
                {isDefaultLanguage() ? 'meny' : 'menu'}
              </Link>
            </div>

            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <animated.div
              data-content
              id={NAV_ID}
              ref={navRef}
              style={{
                opacity: coverAnimStyle.opacity,
                right: isOpen ? 'var(--scrollbar-width)' : null,
                visibility: coverAnimStyle.opacity.interpolate(o =>
                  o === 0 && !isOpen ? 'hidden' : 'visible',
                ),
                pointerEvents: coverAnimStyle.opacity.interpolate(o =>
                  o !== 0 && !isOpen ? 'none' : 'auto',
                ),
              }}
              onKeyDown={event => {
                if (event.key === 'Escape') {
                  event.stopPropagation()
                  toggle(false)
                }
              }}
            >
              <animated.div
                data-cover
                style={{
                  opacity: coverAnimStyle.opacity,
                  transform: interpolate(
                    [
                      coverAnimStyle.x,
                      coverAnimStyle.y,
                      coverAnimStyle.scaleX,
                      coverAnimStyle.scaleY,
                    ],
                    (x, y, sx, sy) => {
                      return `translate3d(${x}px, ${y}px, 0) scale3d(${sx}, ${sy}, 1)`
                    },
                  ),
                }}
              />
              <Grid>
                <Column>
                  <div
                    style={{
                      position: 'relative',
                      zIndex: '1',
                    }}
                  >
                    <AnimatedIconButton
                      type="button"
                      onClick={() => {
                        toggle()
                      }}
                      textColor={colors.light}
                      aria-label="Close menu"
                      style={{
                        opacity: closeAnimStyle.opacity,
                        transform: closeAnimStyle.scale.interpolate(
                          s => `scale3d(${s}, ${s}, 1)`,
                        ),
                      }}
                    >
                      <Icon name={['fal', 'times']} />
                    </AnimatedIconButton>
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
                          transform: itemStyle.x.interpolate(
                            x => `translate3d(${x}%, 0, 0)`,
                          ),
                        }}
                      >
                        <NavLink
                          key={item.link}
                          to={`${getActiveLangPath()}/${item.link}`}
                          getProps={getProps}
                        >
                          {isDefaultLanguage() ? item.sv.title : item.title}
                        </NavLink>
                      </animated.li>
                    ))}
                  </ul>
                </Column>
              </Grid>
            </animated.div>
          </div>
        </NavWrapper>
      )}
    </ThemeContext.Consumer>
  )
}

export default function NavigationWrapper() {
  const cb = useCallback(({ location }) => {
    return <Navigation location={location} />
  }, [])
  return <Location>{cb}</Location>
}
