import styled, { css } from 'styled-components'
import { colors, fontFamily } from '../style'

const text = css`
  color: ${colors.black};
  font-family: ${fontFamily.primary};
`

export const Text = styled.p`
  ${text};
  font-size: 1.8rem;
`

export const Excerpt = styled.p`
  ${text};
  font-size: 2.4rem;
  font-weight: 500;
`

export const H1 = styled.h1`
  ${text};
  font-size: 3.684vw;
  font-weight: 900;
  line-height: 1.25em;
`
