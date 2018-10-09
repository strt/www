import styled, { css } from 'styled-components'
import { colors, fontFamily } from '../style'

const text = css`
  color: ${colors.black};
  font-family: ${fontFamily.primary};
`

export const Text = styled.p`
  ${text};
  margin-bottom: 2em;
  font-size: 1.315vw; // 20px
  line-height: 1.6em;
`

export const Excerpt = styled.p`
  ${text};
  margin-bottom: 2em;
  font-size: 1.578vw; // 24px
  font-weight: 500;
  line-height: 1.6em;
`

export const H1 = styled.h1`
  ${text};
  margin-bottom: 0.28em;
  font-size: 3.684vw; // 56px
  font-weight: 900;
  line-height: 1.25em;
`

export const H2 = styled.h1`
  ${text};
  margin-bottom: 0.25em;
  font-size: 2.105vw; // 32px
  font-weight: 700;
  line-height: 1.25em;
`
