import styled, { css } from 'styled-components'
import { textSize } from './Text'

const style = css`
  ${textSize}
  margin-bottom: 1em;
  list-style-position: inside;
  line-height: 1em;

  li {
    p {
      display: inline-block;
      width: 100%;
      margin: 0;
    }
  }
`

export const UnorderedList = styled.ul`
  ${style}
  list-style-type: square;
`

export const ListItem = styled.li`
  ${textSize}
`

export const OrderedList = styled.ol`
  ${style}
  list-style-type: decimal;
`
