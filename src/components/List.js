import styled, { css } from 'styled-components'
import { base, textSize } from './Text'
import { breakpoints, breakpointNr, fluidRange } from '../style'

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
  margin-bottom: 1em;
`

export const ListItem = styled.li`
  width: 100%;
  line-height: 1.5em;
  ${base}
  ${textSize}

  @media ${breakpoints.medium} {
    font-size: 1.25em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 20,
      max: 30,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 1.875em;
  }
`

export const OrderedList = styled.ol`
  ${style}
  list-style-type: decimal;
`
