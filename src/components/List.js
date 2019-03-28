import styled, { css } from 'styled-components'
import { textSize } from './Text'

const style = css`
  ${textSize}
  margin-bottom: 2em;
  list-style-position: inside;
  line-height: 1.6em;
`

export const UnorderedList = styled.ul`
  ${style}
  list-style-type: square;
`

export const OrderedList = styled.ol`
  ${style}
  list-style-type: decimal;
`
