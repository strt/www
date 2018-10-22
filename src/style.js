import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

export const fontFamily = 'Circular, Helvetica, sans-serif'

export const colors = {
  dark: '#0b101e',
  steel: '#6d7078',
  ice: '#f5f6f6',
  blue: '#2e4fd4',
  watermelonRed: '#fa344e',
  pinkPeach: '#fdbab8',
}

export const breakpoints = {
  small: '(min-width: 640px)',
  medium: '(min-width: 768px)',
  large: '(min-width: 1024px)',
}

export const easings = {
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
}

export const GlobalStyle = createGlobalStyle`
  ${reset};

  html {
    box-sizing: border-box;
    font-size: 10px;
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
    background-color: ${colors.watermelonRed};
  }
`

export function mediaQuery(breakpoint) {
  return `@media screen and ${breakpoint}`
}

export function fluidType({ min, max, viewportMin = 320, viewportMax = 728 }) {
  return `calc(${min}px + (${max} - ${min}) * ((100vw - ${viewportMin}px) / (${viewportMax} - ${viewportMin})));`
}

export function ratio({ x = 16, y = 9 }) {
  return {
    position: 'relative',
    '&::before': {
      content: "''",
      display: 'inline-block',
      paddingBottom: `${(y / x) * 100}%`,
    },
    '*': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  }
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
  return Object.assign(
    {},
    a,
    b,
    Object.keys(b || {}).reduce(
      (obj, key) =>
        Object.assign(obj, {
          [key]:
            a[key] !== null && typeof a[key] === 'object'
              ? merge(a[key], b[key])
              : b[key],
        }),
      {},
    ),
  )
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

function getSpaceValue(n) {
  if (!isNumeric(n)) {
    return n
  }

  const value = (Number(n) * 8) / 15.2

  return `${value}vw`
}

export function space(props) {
  const keys = Object.keys(props)
    .filter(key => REG.test(key))
    .sort()

  return keys
    .map((key) => {
      const value = props[key]
      const cssProperties = getSpaceProperties(key)

      const style = n =>
        n != null
          ? cssProperties.reduce(
              (a, prop) => ({
                ...a,
                [prop]: getSpaceValue(n),
              }),
              {},
            )
          : null

      if (!Array.isArray(value)) {
        return style(value)
      }

      return value.reduce((acc, val, i) => {
        const media = mediaQueries[i]
        const rule = style(val)

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
