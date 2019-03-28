import styled, { css } from 'styled-components'
import { textSize } from './Text'
import { fluidRange } from '../style'

const style = css`
  ${textSize}
  margin-bottom: 2em;
  margin-left: ${fluidRange({ min: 4, max: 8 })};
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
