import styled, { css } from 'styled-components'
import {
  colors,
  fontFamily,
  breakpoints,
  fluidRange,
  textAlign,
  space,
  vw,
} from '../style'

const base = css(
  props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  }),
  textAlign,
  space,
)

export const textSize = css`
  font-size: ${fluidRange({ min: 14, max: 18 })};

  @media ${breakpoints.medium} {
    font-size: ${vw(20)};
  }
`

export const Text = styled.p`
  width: 100%;
  margin-bottom: 2em;
  line-height: 1.6em;
  ${base}
  ${textSize}
`

export const Excerpt = styled.p`
  margin-bottom: 2em;
  font-size: ${fluidRange({ min: 16, max: 20 })};
  font-weight: 500;
  line-height: 1.6em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: ${vw(24)};
  }
`

export const H1 = styled.h1`
  margin-bottom: 0.28em;
  font-size: ${fluidRange({ min: 32, max: 48 })};
  font-weight: 900;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: ${vw(56)};
  }
`

export const H2 = styled.h2`
  margin-bottom: 0.25em;
  font-size: ${fluidRange({ min: 24, max: 28 })};
  font-weight: 700;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: ${vw(32)};
  }
`

export const H3 = styled.h3`
  margin-bottom: 0.666em;
  font-size: ${fluidRange({ min: 18, max: 24 })};
  font-weight: 500;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: ${vw(24)};
  }
`

export const H4 = styled.h4`
  margin-bottom: 0.666em;
  font-size: ${fluidRange({ min: 14, max: 18 })};
  font-weight: 700;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: ${vw(20)};
  }
`

export const H6 = styled.h6`
  margin-bottom: 0.666em;
  font-size: ${fluidRange({ min: 12, max: 15 })};
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: ${vw(14)};
  }
`
