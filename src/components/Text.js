import styled, { css } from 'styled-components'
import {
  colors,
  fontFamily,
  breakpoints,
  fluidType,
  textAlign,
  space,
} from '../style'

const textStyle = css(
  props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  }),
  textAlign,
  space,
)

export const Text = styled.p`
  margin-bottom: 2em;
  font-size: ${fluidType({ min: 14, max: 18 })};
  line-height: 1.6em;
  ${textStyle};

  @media ${breakpoints.medium} {
    font-size: ${20 / 15.2}vw;
  }
`

export const Excerpt = styled.p`
  margin-bottom: 2em;
  font-size: ${fluidType({ min: 16, max: 20 })};
  font-weight: 500;
  line-height: 1.6em;
  ${textStyle};

  @media ${breakpoints.medium} {
    font-size: ${24 / 15.2}vw;
  }
`

export const H1 = styled.h1`
  margin-bottom: 0.28em;
  font-size: ${fluidType({ min: 26, max: 44 })};
  font-weight: 900;
  line-height: 1.25em;
  ${textStyle};

  @media ${breakpoints.medium} {
    font-size: ${56 / 15.2}vw;
  }
`

export const H2 = styled.h2`
  margin-bottom: 0.25em;
  font-size: ${fluidType({ min: 22, max: 28 })};
  font-weight: 700;
  line-height: 1.25em;
  ${textStyle};

  @media ${breakpoints.medium} {
    font-size: ${32 / 15.2}vw;
  }
`

export const H3 = styled.h3`
  margin-bottom: 0.666em;
  font-size: ${fluidType({ min: 18, max: 24 })};
  font-weight: 500;
  line-height: 1.25em;
  ${textStyle};

  @media ${breakpoints.medium} {
    font-size: ${24 / 15.2}vw;
  }
`
