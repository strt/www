import styled from 'styled-components'
import { colors, fontFamily, fluidRange, breakpoints } from '../style'

const Link = styled.a`
  border: none;
  padding: 0;
  margin: 0;
  font-size: ${fluidRange({ min: 14, max: 18 })};
  font-family: ${fontFamily};
  font-weight: ${props => (props.thin ? 400 : 500)};
  text-decoration: underline;
  color: ${props => props.textColor || colors.blue};
  background: none;

  @media screen and ${breakpoints.medium} {
    font-size: ${20 / 15.2}vw;
  }
`

export default Link
