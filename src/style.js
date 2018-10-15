import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

export const space = [
  '0',
  '0.4rem',
  '0.8rem',
  '1.2rem',
  '1.6rem',
  '2.4rem',
  '3.2rem',
  '4rem',
  '4.8rem',
  '5.6rem',
  '6.4rem',
]

export const fontFamily = {
  primary: 'Circular, Helvetica, sans-serif',
}

export const breakpoints = {
  small: '(min-width: 42rem)',
  medium: '(min-width: 64rem)',
  large: '(min-width: 96rem)',
}

export const colors = {
  black: '#0b101e',
  gray500: '#85888e',
  gray100: '#f5f6f6',
  red500: '#fa344e',
  blue500: '#2e4fd4',
}

export const easings = {
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 10px;
    font-family: ${fontFamily.sansSerif};
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

  img {
    display: inline-block;
    vertical-align: middle;
    height: auto;
    max-width: 100%;
  }

  ::selection {
    color: white;
    background-color: ${colors.red500};
  }
`

export function createMediaQuery(n) {
  return `@media screen and ${n}`
}

const mediaQueries = [null, ...Object.values(breakpoints).map(createMediaQuery)]

function noop(n) {
  return n
}

export function getWidth(value) {
  if (value == null) {
    return null
  }

  if (!Number.isNaN(Number(value))) {
    return `${(100 / 12) * Number(value)}%`
  }

  return value
}

export function pxToFluid(px, base = 15.2) {
  return `${px / base}vw` /* investigate using css variables for the base */
}

export function getStyleProperty(prop, value, transformValue = noop) {
  if (value == null) {
    return null
  }

  return {
    [prop]: transformValue(value),
  }
}

function createStyle({ prop, cssProperty, transformValue }) {
  const css = cssProperty || prop

  function fn(props) {
    const value = props[css]
    if (value == null) {
      return null
    }

    if (!Array.isArray(value)) {
      return getStyleProperty(css, value, transformValue)
    }

    return mediaQueries.reduce((acc, mediaQuery, i) => {
      if (!mediaQuery) {
        return getStyleProperty(css, value[i], transformValue) || {}
      }

      const rule = getStyleProperty(css, value[i], transformValue)

      if (!rule) {
        return acc
      }

      acc[mediaQuery] = rule

      return acc
    }, {})
  }

  return fn
}

export const textColor = createStyle({
  prop: 'textColor',
  cssProperty: 'color',
})

export const bgColor = createStyle({
  prop: 'bg',
  cssProperty: 'backgroundColor',
})

export const textAlign = createStyle({
  prop: 'textAlign',
})

export const display = createStyle({
  prop: 'display',
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

export const flex = createStyle({
  prop: 'flex',
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
