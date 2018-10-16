import styled, { css } from 'styled-components'
import { colors, fontFamily, breakpoints, pxToFluid } from '../style'

const baseStyle = css`
  color: ${colors.black};
  font-family: ${fontFamily.primary};

  a {
    color: inherit;
    font-size: inherit;
  }
`

export const Text = styled.p`
  ${baseStyle};
  margin-bottom: 2em;
  font-size: ${pxToFluid(20)};
  line-height: 1.6em;
`

export const Excerpt = styled.p`
  ${baseStyle};
  margin-bottom: 2em;
  font-size: ${pxToFluid(24)};
  font-weight: 500;
  line-height: 1.6em;
`

export const H1 = styled.h1`
  ${baseStyle};
  margin-bottom: 0.28em;
  font-size: ${pxToFluid(56, 9.6)};
  font-weight: 900;
  line-height: 1.25em;

  @media ${breakpoints.medium} {
    font-size: ${pxToFluid(56)};
  }
`

export const H2 = styled.h2`
  ${baseStyle};
  margin-bottom: 0.25em;
  font-size: ${pxToFluid(32)};
  font-weight: 700;
  line-height: 1.25em;
`

export const H3 = styled.h3`
  ${baseStyle};
  margin-bottom: 0.666em;
  font-size: ${pxToFluid(24)};
  font-weight: 500;
  line-height: 1.67em;
`
