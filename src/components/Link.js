import styled from 'styled-components'
import { colors, fontFamily, pxToFluid } from '../style'

const Link = styled.a`
  font-size: ${pxToFluid(20)};
  text-decoration: underline;
  color: ${colors.blue500};
  font-family: ${fontFamily.primary};
`

export default Link
