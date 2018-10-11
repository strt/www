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
  small: '(min-width: 52rem)',
  medium: '(min-width: 64rem)',
  large: '(min-width: 96remx)',
}

export const colors = {
  black: '#0b101e',
  gray500: '#85888e',
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

export const createMediaQuery = n => `@media screen and (min-width: ${n})`

export function pxToFluid(px, base = 15.2) {
  return `${px / base}vw`
}

function style({ prop, cssProperty }) {
  const css = cssProperty || prop

  function fn(props) {
    const value = props[css]
    if (value == null) return null

    return {
      [css]: value,
    }
  }

  return fn
}

export const textColor = style({
  prop: 'textColor',
  cssProperty: 'color',
})

export const bgColor = style({
  prop: 'bg',
  cssProperty: 'backgroundColor',
})

export const textAlign = style({
  prop: 'textAlign',
})

export const display = style({
  prop: 'display',
})

export const alignItems = style({
  prop: 'alignItems',
})

export const alignContent = style({
  prop: 'alignContent',
})

export const justifyItems = style({
  prop: 'justifyItems',
})

export const justifyContent = style({
  prop: 'justifyContent',
})

export const flexWrap = style({
  prop: 'flexWrap',
})

export const flexBasis = style({
  prop: 'flexBasis',
})

export const flexDirection = style({
  prop: 'flexDirection',
})

export const flex = style({
  prop: 'flex',
})

export const justifySelf = style({
  prop: 'justifySelf',
})

export const alignSelf = style({
  prop: 'alignSelf',
})

export const order = style({
  prop: 'order',
})
