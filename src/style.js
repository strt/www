import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'
import circularBookWoff from './assets/fonts/circular-book.woff'
import circularBookWoff2 from './assets/fonts/circular-book.woff2'
import circularBookItalicWoff from './assets/fonts/circular-bookitalic.woff'
import circularBookItalicWoff2 from './assets/fonts/circular-bookitalic.woff2'
import circularBoldWoff from './assets/fonts/circular-bold.woff'
import circularBoldWoff2 from './assets/fonts/circular-bold.woff2'
import circularBoldItalicWoff from './assets/fonts/circular-bolditalic.woff'
import circularBoldItalicWoff2 from './assets/fonts/circular-bolditalic.woff2'
import circularBlackWoff from './assets/fonts/circular-black.woff'
import circularBlackWoff2 from './assets/fonts/circular-black.woff2'

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

function fontFace({
  woff,
  woff2,
  fontFamily: name,
  fontWeight = 'normal',
  fontStyle = 'normal',
}) {
  return `
    @font-face {
      font-family: ${name};
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
      font-display: fallback;
      src: url(${woff2}) format("woff2"), url(${woff}) format("woff");
    }
  `
}

export const GlobalStyle = createGlobalStyle`
  ${reset};

  /*
  * Legal Disclaimer
  *
  * These Fonts are licensed only for use on these domains and their subdomains:
  * strateg.se
  *
  * It is illegal to download or use them on other websites.
  *
  * While the @font-face statements below may be modified by the client, this
  * disclaimer may not be removed.
  *
  * Lineto.com, 2018
  */

  ${fontFace({
    fontFamily: 'Circular',
    fontWeight: 400,
    woff: circularBookWoff,
    woff2: circularBookWoff2,
  })}

  ${fontFace({
    fontFamily: 'Circular',
    fontWeight: 400,
    fontStyle: 'italic',
    woff: circularBookItalicWoff,
    woff2: circularBookItalicWoff2,
  })}

  ${fontFace({
    fontFamily: 'Circular',
    fontWeight: 800,
    woff: circularBoldWoff,
    woff2: circularBoldWoff2,
  })}

  ${fontFace({
    fontFamily: 'Circular',
    fontWeight: 700,
    fontStyle: 'italic',
    woff: circularBoldItalicWoff,
    woff2: circularBoldItalicWoff2,
  })}

  ${fontFace({
    fontFamily: 'Circular',
    fontWeight: 900,
    fontStyle: 'normal',
    woff: circularBlackWoff,
    woff2: circularBlackWoff2,
  })}
 
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
  prop: 'color',
  key: 'colors',
})

export const bgColor = style({
  prop: 'bg',
  cssProperty: 'backgroundColor',
  key: 'colors',
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
