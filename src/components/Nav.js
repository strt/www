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
import Link from './Link'
import { Grid, Column } from './Grid'
import SelectLanguageWrapper, {
  getActiveLangPath,
  isDefaultLanguage,
} from './SelectLanguage'
import useFocusTrap from '../lib/useFocusTrap'
import useDisableScroll from '../lib/useDisableScroll'
import useToggle from '../lib/useToggle'
import { colors, fluidRange, easings, durations, vw } from '../style'
import { ThemeContext } from '../context/ThemeContext'

function getProps({ href, isPartiallyCurrent }) {
  return isPartiallyCurrent && href !== '/'
    ? { 'data-partially-current': true }
    : null
}

const NavLink = styled(GatsbyLink)`
  display: inline-block;
  margin-bottom: ${fluidRange({ min: 8, max: 12 })};
  font-size: 2.5rem;
  line-height: 1.4;
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

const CloseButton = styled.div`
  position: absolute;
  top: ${fluidRange({ min: 18, max: 32 })};
  right: ${fluidRange({ min: 4, max: 8 })};
  color: ${colors.grey400};
`

const NavWrapper = styled.nav`
  [data-responsive] {
    @media (min-width: 803px) {
      display: none;
    }
  }

  [data-desktop] {
    display: none;

    @media (min-width: 803px) {
      display: flex;
    }

    li {
      padding-right: ${vw(40)};

      &:last-child {
        padding-right: 0;
      }
    }

    .nav-dark {
      &:hover {
        color: ${colors.light};
      }

      &:active {
        color: ${colors.darkText};
      }

      &:focus-visible {
        color: ${colors.darkText};
      }
    }

    .nav-light,
    .nav-gray,
    .nav-lightGray {
      &:hover {
        color: ${colors.darkText};
      }

      &:focus-visible {
        color: ${colors.darkText};
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
      top: ${fluidRange({ min: 16, max: 16 })};
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

const LangWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: ${fluidRange({ min: 36, max: 46 })};
  left: 50%;
  margin-left: -50px;
`

const NAV_ID = 'navigation'

function Navigation({ menu }) {
  const [isOpen, toggle] = useToggle(false)
  const navRef = useRef(null)
  useFocusTrap(navRef, { shouldTrap: isOpen })
  useDisableScroll(isOpen)

  // Close nav on location change
  useEffect(() => {
    toggle(false)
  }, [toggle])

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
  const transitions = useTransition(menu.pages, item => item.id, {
    ref: itemsTransitionRef,
    unique: true,
    config: { ...config.default, friction: 30 },
    trail: 250 / menu.pages.length,
    reverse: !isOpen,
    from: { opacity: 0, x: -40 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: -12 },
  })

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
            {menu.pages
              .filter(item => item.slug !== '/')
              .map(item => (
                <li key={item.id}>
                  <Link
                    to={`${getActiveLangPath()}/${item.slug}`}
                    getProps={getProps}
                    textColor={theme.navColor}
                    styleVariant={theme.theme}
                    style={{ fontSize: '1.125rem' }}
                    className={`nav-${theme.theme}`}
                    key={item.id}
                  >
                    {item.name}
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
                variant="small"
                textColor={theme.colorSecondary}
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
                <Column smDown={8} sm={7}>
                  <LangWrapper>
                    <ul
                      style={{
                        display: 'flex',
                      }}
                    >
                      <SelectLanguageWrapper textColor="white" />
                    </ul>
                  </LangWrapper>
                </Column>
                <Column smDown={4} sm={5}>
                  <div
                    style={{
                      position: 'relative',
                      zIndex: '1',
                    }}
                  >
                    <CloseButton
                      type="button"
                      onClick={() => {
                        toggle()
                      }}
                    >
                      {isDefaultLanguage() ? 'stäng' : 'close'}
                    </CloseButton>
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
                          key={item.id}
                          to={`${getActiveLangPath()}/${item.slug}`}
                          getProps={getProps}
                        >
                          {item.name}
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

export default function NavigationWrapper({ menu }) {
  const cb = useCallback(
    location => {
      return <Navigation location={location} menu={menu} />
    },
    [menu],
  )
  return <Location>{cb}</Location>
}
