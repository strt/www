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

export const base = css(
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
    font-size: max(${vw(20)}, 10px);
  }
`

export const Text = styled.p`
  width: 100%;
  margin-bottom: 1.25em;
  line-height: 1.5em;
  ${base}
  ${textSize}
`

export const Excerpt = styled.p`
  margin-bottom: 1.25em;
  font-size: ${fluidRange({ min: 16, max: 20 })};
  font-weight: 500;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: max(${vw(24)}, 12px);
  }
`

export const H1 = styled.h1`
  margin-bottom: 0.175em;
  font-size: 1.75em;
  font-weight: 400;
  line-height: 1.125em;
  ${base} 
  
  @media ${breakpoints.medium} {
    font-size: max(30px, 60px);
    line-height: 1.125em;
  }
`

export const H1Large = styled.h1`
  margin-bottom: 0.175em;
  font-size: ${fluidRange({ min: 48, max: 64 })};
  font-weight: 400;
  line-height: 1.25em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: 8.25em;
    line-height: 0.924em;
    letter-spacing: -6.6px;
  }
`

export const H2 = styled.h2`
  margin-bottom: 0.15625em;
  font-size: ${fluidRange({ min: 24, max: 28 })};
  font-weight: 700;
  line-height: 0.78125em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: max(${vw(32)}, 14px);
  }
`

export const H3 = styled.h3`
  margin-bottom: 0.4125em;
  font-size: ${fluidRange({ min: 18, max: 24 })};
  font-weight: 500;
  line-height: 0.9em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: max(${vw(24)}, 12px);
  }
`

export const H4 = styled.h4`
  margin-bottom: 0.4125em;
  font-size: ${fluidRange({ min: 14, max: 18 })};
  font-weight: 700;
  line-height: 0.78125em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: max(${vw(20)}, 10px);
  }
`

export const H6 = styled.h6`
margin-bottom: 0.4125em;
font-size: ${fluidRange({ min: 12, max: 15 })};
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  line-height: 0.78125em;
  ${base}

  @media ${breakpoints.medium} {
    font-size: max(${vw(14)}, 10px);
  }
`
