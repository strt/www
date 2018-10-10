import styled, { css } from 'styled-components'
import { colors, fontFamily, pxToFluid } from '../style'

const text = css`
  color: ${colors.black};
  font-family: ${fontFamily.primary};
`

export const Text = styled.p`
  ${text};
  margin-bottom: 2em;
  font-size: ${pxToFluid(20)};
  line-height: 1.6em;
`

export const Excerpt = styled.p`
  ${text};
  margin-bottom: 2em;
  font-size: ${pxToFluid(24)};
  font-weight: 500;
  line-height: 1.6em;
`

export const H1 = styled.h1`
  ${text};
  margin-bottom: 0.28em;
  font-size: ${pxToFluid(56)};
  font-weight: 900;
  line-height: 1.25em;
`

export const H2 = styled.h2`
  ${text};
  margin-bottom: 0.25em;
  font-size: ${pxToFluid(40)};
  font-weight: 900;
  line-height: 1.25em;
`

export const H3 = styled.h3`
  ${text};
  margin-bottom: 0.25em;
  font-size: ${pxToFluid(32)};
  font-weight: 700;
  line-height: 1.25em;
`

export const H4 = styled.h4`
  ${text};
  margin-bottom: 0.25em;
  font-size: ${pxToFluid(24)};
  font-weight: 500;
  line-height: 1.25em;
`
