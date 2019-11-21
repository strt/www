import { createGlobalStyle, keyframes } from 'styled-components'
import { reset } from 'styled-reset'

export const fontFamily = 'Circular, Helvetica, sans-serif'

export const colors = {
  blue050: '#e6eafa',
  blue100: '#c0caf2',
  blue200: '#97a7ea',
  blue300: '#6d84e1',
  blue400: '#4d69da',
  blue500: '#2e4fd4',
  blue600: '#2948cf',
  blue700: '#233fc9',
  blue800: '#1d36c3',
  blue900: '#1226b9',
  dark: '#0b101e',
  light: '#ffffff',
  ice: '#f5f6f6',
  pinkPeach500: '#fdbab8',
  steel050: '#edeeef',
  steel100: '#d3d4d7',
  steel200: '#b6b8bc',
  steel300: '#999ba1',
  steel400: '#83858c',
  steel500: '#6d7078',
  steel600: '#656870',
  steel700: '#5a5d65',
  steel800: '#50535b',
  steel900: '#3e4148',
  watermelonRed050: '#fee7ea',
  watermelonRed100: '#fec2ca',
  watermelonRed200: '#fd9aa7',
  watermelonRed300: '#fc7183',
  watermelonRed400: '#fb5269',
  watermelonRed500: '#fa344e',
  watermelonRed600: '#f92f47',
  watermelonRed700: '#f9273d',
  watermelonRed800: '#f82135',
  watermelonRed900: '#f61525',
}

export const breakpoints = {
  small: '(min-width: 640px)',
  medium: '(min-width: 768px)',
  large: '(min-width: 1024px)',
}

export const durations = {
  fast: '120ms',
  normal: '220ms',
  slow: '320ms',
}

export const easings = {
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeInOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
}

export const baseFontsize = '16px'

export const GlobalStyle = createGlobalStyle`
  ${reset};

  :root {
    --scrollbar-width: 0;
    --nprogress-color: ${colors.dark};
  }

  html {
    box-sizing: border-box;
    font-size: ${baseFontsize};
    font-family: ${fontFamily};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  b,
  strong {
    font-weight: 700;
  }

  i,
  em {
    font-style: italic;
  }

  img {
    display: inline-block;
    vertical-align: middle;
    height: auto;
    max-width: 100%;
  }

  ::selection {
    color: white;
    background-color: ${colors.dark};
  }

  :focus {
    outline: dotted 1px ${colors.dark};
  }

  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--nprogress-color);
  }

  #nprogress .peg {
    position: absolute;
    right: 0;
    display: block;
    width: 100px;
    height: 100%;
    opacity: 1.0;
    transform: rotate(3deg) translate(0, -4px);
  }

  @-webkit-keyframes move {
    from {
      background-position: 2px 19px;
    }
    to {
      background-position: 500px 19px;
    }
  }
  
  @keyframe move {
    from {
      background-position: 2px 19px;
    }
    to {
      background-position: 500px 19px;
    }
  }

  .dark {
    background-color: ${colors.dark};
    transition: all 0.6s ease;
  }
  
  .light {
    transition: all 0.6s ease;
  }

`

/**
 * Mixins/helpers
 */
export function mediaQuery(breakpoint) {
  return `@media screen and ${breakpoint}`
}

export function fluidRange({ min, max, viewportMin = 320, viewportMax = 728 }) {
  return `calc(${min}px + (${max} - ${min}) * ((100vw - ${viewportMin}px) / ${viewportMax -
    viewportMin}))`
}

export function ratio({ x = 16, y = 9 } = {}) {
  return {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    '&::before': {
      content: "''",
      display: 'inline-block',
      height: 0,
      paddingBottom: `${(y / x) * 100}%`,
    },
  }
}

export function cover() {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}

export function vw(n) {
  return `${n / 15.2}vw`
}

/**
 * Animations
 */
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const animations = {
  fadeIn,
}

/**
 * This is a modified version of styled-system.
 * MIT License: https://github.com/jxnblk/styled-system/blob/master/LICENSE.md
 */

// Utils
function noop(i) {
  return i
}

function isNumeric(num) {
  return !Number.isNaN(Number(num))
}

function merge(a, b) {
  return {
    ...a,
    ...b,
    ...Object.keys(b || {}).reduce(
      (obj, key) =>
        Object.assign(obj, {
          [key]:
            a[key] !== null && typeof a[key] === 'object'
              ? merge(a[key], b[key])
              : b[key],
        }),
      {},
    ),
  }
}

const mediaQueries = [null, ...Object.values(breakpoints).map(mediaQuery)]

export function getStyleDeclaration(prop, value, transformValue = noop) {
  if (value == null) {
    return null
  }

  return {
    [prop]: transformValue(value),
  }
}

export function getResponsiveStyle(cssProperty, values, transformValue) {
  return mediaQueries.reduce((acc, media, i) => {
    const rule = getStyleDeclaration(cssProperty, values[i], transformValue)

    if (!media) {
      return rule || {}
    }

    if (rule) {
      acc[media] = rule
    }

    return acc
  }, {})
}

function createStyle({ prop, cssProperty = prop, transformValue }) {
  function fn(props) {
    const value = props[prop]
    if (value == null) {
      return null
    }

    if (!Array.isArray(value)) {
      return getStyleDeclaration(cssProperty, value, transformValue)
    }

    return getResponsiveStyle(cssProperty, value, transformValue)
  }

  return fn
}

// Space
const REG = /^[mp][trblxy]?$/
const properties = {
  m: 'margin',
  p: 'padding',
}
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
}

function getSpaceProperties(key) {
  const [a, b] = key.split('')
  const property = properties[a]
  const direction = directions[b] || ''
  return Array.isArray(direction)
    ? direction.map(dir => property + dir)
    : [property + direction]
}

function getSpaceValue(n, i) {
  if (!isNumeric(n)) {
    return n
  }

  const scale = i === 0 ? 3.75 : 15.2
  const value = (Number(n) * 8) / scale

  return value !== 0 ? `${value}vw` : value
}

export function space(props) {
  const keys = Object.keys(props)
    .filter(key => REG.test(key))
    .sort()

  return keys
    .map(key => {
      const value = props[key]
      const cssProperties = getSpaceProperties(key)

      const style = (n, i) =>
        n != null
          ? cssProperties.reduce(
              (a, prop) => ({
                ...a,
                [prop]: getSpaceValue(n, i),
              }),
              {},
            )
          : null

      if (!Array.isArray(value)) {
        return style(value)
      }

      return value.reduce((acc, val, i) => {
        const media = mediaQueries[i]
        const rule = style(val, i)

        if (!media) {
          return rule || {}
        }

        if (rule) {
          acc[media] = rule
        }

        return acc
      }, {})
    })
    .reduce(merge, {})
}

export const bgColor = createStyle({
  prop: 'bg',
  cssProperty: 'backgroundColor',
})

export const textColor = createStyle({
  prop: 'textColor',
  cssProperty: 'color',
})

export const textAlign = createStyle({
  prop: 'textAlign',
})

export const alignItems = createStyle({
  prop: 'alignItems',
})

export const alignContent = createStyle({
  prop: 'alignContent',
})

export const justifyItems = createStyle({
  prop: 'justifyItems',
})

export const justifyContent = createStyle({
  prop: 'justifyContent',
})

export const flexWrap = createStyle({
  prop: 'flexWrap',
})

export const flexBasis = createStyle({
  prop: 'flexBasis',
})

export const flexDirection = createStyle({
  prop: 'flexDirection',
})

export const justifySelf = createStyle({
  prop: 'justifySelf',
})

export const alignSelf = createStyle({
  prop: 'alignSelf',
})

export const order = createStyle({
  prop: 'order',
})
