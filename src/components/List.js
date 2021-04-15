import styled, { css } from 'styled-components'
import { base, textSize } from './Text'
import { breakpoints } from '../style'

const style = css`
  ${textSize}
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
  list-style-position: initial;
  margin-bottom: 1em;
`

export const ListItem = styled.li`
  width: 100%;
  line-height: 1.5em;
  ${base}
  font-size: 1.125rem;

  @media ${breakpoints.medium} {
    ${textSize}
  }
`

export const OrderedList = styled.ol`
  ${style}
  list-style-type: decimal;
`
