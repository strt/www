import styled, { css } from 'styled-components'
import {
  colors,
  fontFamily,
  breakpoints,
  breakpointNr,
  fluidRange,
  textAlign,
  space,
} from '../style'

export const base = css(
  props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  }),
  textAlign,
  space,
)

export const textSize = css`
  font-size: 16px;
`

export const Text = styled.p`
  width: 100%;
  margin-bottom: 1.25em;
  line-height: 1.5em;
  ${base}
  ${textSize}

  @media ${breakpoints.medium} {
    font-size: 1.25em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 20,
      max: 30,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 1.875em;
  }
`

export const Excerpt = styled.p`
  margin-bottom: 1.25em;
  font-size: 1.875em;
  font-weight: 500;
  line-height: 1.25em;
  white-space: pre-line;
  ${base}

  @media ${breakpoints.medium} {
    max-width: 50%;
    font-size: 2.5em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 40,
      max: 60,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 3.75em;
  }

  a::after {
    bottom: -10%;
    background-size: 9px 11px;

    @media ${breakpoints.large} {
      bottom: 0%;
      background-size: 15px 11px;
    }
  }
`

export const H1 = styled.h1`
  margin-bottom: 0.175em;
  font-size: 4em;
  font-weight: 400;
  line-height: 1.1em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: 8.25em;
    letter-spacing: -0.05em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 132,
      max: 196,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 12.25em;
  }
`

export const H2 = styled.h2`
  margin-bottom: 0.4125em;
  font-size: 1.875em;
  font-weight: 700;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: 2.5em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 40,
      max: 60,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 3.75em;
  }
`

export const H3 = styled.h3`
  margin-bottom: 0.4125em;
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1.125em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: 2em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 32,
      max: 48,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 3em;
  }
`

export const H4 = styled.h4`
  margin-bottom: 0.4125em;
  font-size: 1.3125em;
  font-weight: 700;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: 1.75em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 28,
      max: 42,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 2.625em;
  }
`

export const H6 = styled.h6`
margin-bottom: 0.4125em;
font-size: 1.3125em;
font-weight: 700;
text-transform: uppercase;
line-height: 1em;
${base}

@media ${breakpoints.medium} {
  font-size: 1.25em;
}

@media ${breakpoints.large} {
  font-size: ${fluidRange({
    min: 22,
    max: 33,
    viewportMin: breakpointNr.large,
    viewportMax: breakpointNr.xlarge,
  })};
}

@media ${breakpoints.xlarge} {
  font-size: 2.0625em;
}
`
