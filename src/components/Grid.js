import styled from 'styled-components'
import { justifyContent, justifyItems, alignItems, flexWrap } from '../style'

export const Grid = styled.div(
  {
    display: 'flex',
    flexWrap: 'wrap',
    // maxWidth: '1408px',
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

export const Column = styled.div`
  width: 66.666%;
`
