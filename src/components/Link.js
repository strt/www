import styled from 'styled-components'
import { colors, fontFamily, fluidRange, breakpoints, vw } from '../style'

const Link = styled.a`
  border: none;
  padding: 0;
  margin: 0;
  font-size: ${props => props.fontSize || fluidRange({ min: 16, max: 20 })};
  font-family: ${fontFamily};
  font-weight: ${props => (props.thin ? 400 : 500)};
  text-decoration: underline;
  color: ${props => props.textColor || colors.blue};
  background: none;

  @media screen and ${breakpoints.medium} {
    font-size: ${vw(20)};
  }
`

export default Link
