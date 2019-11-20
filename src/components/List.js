import styled, { css } from 'styled-components'
import { textSize } from './Text'
import { fluidRange } from '../style'

const style = css`
  ${textSize}
  margin-bottom: 1.25em;
  margin-left: ${fluidRange({ min: 4, max: 8 })};
  list-style-position: inside;
  line-height: 1em;

  li {
    p {
      display: inline-block;
      width: 100%;
    }
  }
`

export const UnorderedList = styled.ul`
  ${style}
  list-style-type: square;
`

export const OrderedList = styled.ol`
  ${style}
  list-style-type: decimal;
`
