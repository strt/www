import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import { colors, fontFamily, pxToFluid } from '../style'

const A = styled.a`
  font-size: ${pxToFluid(20)};
  text-decoration: underline;
  color: ${colors.blue500};
  font-family: ${fontFamily.primary};
`

export default function Link(props) {
  return <A as={props.to ? GatsbyLink : undefined} {...props} />
}
