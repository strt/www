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
  font-size: 24px;
`

export const Text = styled.p`
  width: 100%;
  margin-bottom: 1.25em;
  line-height: 1.4;
  font-size: 1.125rem;
  ${base}

  @media ${breakpoints.medium} {
    ${textSize}
  }
`

export const TextSmall = styled.p`
  width: 100%;
  margin-bottom: 1.25em;
  font-size: 1rem;
  line-height: 1.4;
  ${base}

  @media ${breakpoints.medium} {
    font-size: 1.125rem;
  }
`

export const Excerpt = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
  white-space: pre-line;
  ${base}

  @media ${breakpoints.medium} {
    max-width: 75%;
    font-size: 2.5rem;
  }

  @media ${breakpoints.large} {
    max-width: 58.333%;
  }

  a::after {
    bottom: -10%;
    background-size: 9px 11px;
  }
`

export const H1 = styled.h1`
  margin-bottom: 0.275em;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -2px
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

  @media ${breakpoints.medium} {
    max-width: 75%;
    font-size: 5.5rem;
  }

  @media ${breakpoints.large} {
    max-width: 58.333%;
  }
`

export const JumboH1 = styled.h1`
  margin-bottom: 0.175em;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -2px;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

  @media ${breakpoints.medium} {
    padding: 0;
    font-size: 8rem;
    line-height: 1.1;
  }
`

export const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

  @media ${breakpoints.medium} {
    font-size: 3rem;
  }

  ${A}{
    color: ${colors.linkColor};
    &:hover{
      color: ${colors.linkColor};

      &::after{
        display:none;
      }
    }
  }
`

export const H3 = styled.h3`
  margin-bottom: 0.4125em;
  font-size: 1.5rem;
  font-weight: 400;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

  @media ${breakpoints.medium} {
    font-size: 2rem;
  }

  ${A}{
    color: ${colors.linkColor};
    &:hover{
      color: ${colors.linkColor};

      &::after{
        display:none;
      }
    }
  }
`

export const H4 = styled.h4`
  margin-bottom: 0.5125em;
  font-size: 1.125rem;
  font-weight: 500;
  ${base}
  ${props => ({
    fontFamily,
    color: props.textColor || colors.dark,
  })}

  @media ${breakpoints.medium} {
    font-size: 1.5rem;
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
