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
import { A } from './Link'

export const base = css(
  props => ({
    fontFamily,
    color: props.textColor || colors.darkText,
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
  font-weight: 400;
  line-height: 1.15em;
  white-space: pre-line;
  ${base}

  @media ${breakpoints.smallDown} {
    font-size: 1em;
  }
  
  @media ${breakpoints.medium} {
    max-width: 75%;
  }

  @media ${breakpoints.large} {
    max-width: 50%;
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
  font-size: 2em;
  font-weight: 400;
  line-height: 1em;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

  @media ${breakpoints.small} {
    font-size: 4em;
  }

  @media ${breakpoints.medium} {
    font-size: 6em;
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
  font-weight: 400;
  line-height: 1em;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

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

  ${A}{
    color: ${colors.purple500};
    &:hover{
      color: ${colors.purple600};

      &::after{
        display:none;
      }
    }
  }
`

export const H3 = styled.h3`
  margin-bottom: 0.4125em;
  font-size: 1.5em;
  font-weight: 400;
  line-height: 1em;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

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

  ${A}{
    color: ${colors.purple500};
    &:hover{
      color: ${colors.purple600};

      &::after{
        display:none;
      }
    }
  }
`

export const H4 = styled.h4`
  margin-bottom: 0.4125em;
  font-size: 1.3125em;
  font-weight: 400;
  line-height: 1.25em;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

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


  ${A}{
    color: ${colors.purple500};
    &:hover{
      color: ${colors.purple600};

      &::after{
        display:none;
      }
    }
  }
`

export const H6 = styled.h6`
  margin-bottom: 0.4125em;
  font-size: 1.3125em;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1em;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

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
