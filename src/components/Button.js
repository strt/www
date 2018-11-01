import styled from 'styled-components'
import { colors, fluidRange, breakpoints } from '../style'

export default function Button() {
  return null
}

export const IconButton = styled.button`
  appearance: none;
  padding: 0;
  margin: 0;
  border: none;
  font-size: ${fluidRange({ min: 20, max: 26 })};
  color: ${colors.dark};
  background: none;

  @media ${breakpoints.medium} {
    font-size: ${32 / 15.2}vw;
  }

  &:focus {
    outline: none;
  }
`
