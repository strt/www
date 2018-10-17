import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

export const fontFamily = 'Circular, Helvetica, sans-serif'

export const colors = {
  black: '#0b101e',
  gray500: '#85888e',
  gray100: '#f5f6f6',
  blue500: '#2e4fd4',
  red500: '#fa344e',
  pink500: '#fdbab8',
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

export const spacings = [0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 72, 96, 120, 184]

export const GlobalStyle = createGlobalStyle`
  ${reset};

  :root {
    font-size: 10px;
    font-family: ${fontFamily};
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
    background-color: ${colors.red500};
  }
`

function noop(i) {
  return i
}

export function mediaQuery(breakpoint) {
  return `@media screen and ${breakpoint}`
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
  return mediaQueries.reduce((acc, curr, i) => {
    const rule = getStyleDeclaration(cssProperty, values[i], transformValue)

    if (!curr) {
      return rule || {}
    }

    if (rule) {
      acc[curr] = rule
    }

    return acc
  }, {})
}

function createStyle({ prop, cssProperty, transformValue }) {
  const css = cssProperty || prop

  function fn(props) {
    const value = props[prop]
    if (value == null) {
      return null
    }

    if (!Array.isArray(value)) {
      return getStyleDeclaration(css, value, transformValue)
    }

    return getResponsiveStyle(css, value, transformValue)
  }

  return fn
}

export function fluid(px, base = 15.2) {
  return `${px / base}vw`
}

export function fluidType({ min, max, viewportMin = 320, viewportMax = 728 }) {
  return `calc(${min}px + (${max} - ${min}) * ((100vw - ${viewportMin}px) / (${viewportMax} - ${viewportMin})));`
}

export function getSpace(i) {
  return fluid(spacings[i])
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
