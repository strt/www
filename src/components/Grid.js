import styled from 'styled-components'
import {
  breakpoint,
  justifyContent,
  justifyItems,
  alignItems,
  flexWrap,
} from '../style'

export const Grid = styled.div(
  {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '4vw',
    paddingLeft: '4vw',
  },
  alignItems,
  flexWrap,
  justifyItems,
  justifyContent,
)

export const Column = styled.div(({ tablet, w }) => ({
  width: w || '100%',
  [`@media ${breakpoint.medium}`]: {
    width: tablet ? `${(100 / 12) * Number(tablet)}%` : undefined,
  },
}))
