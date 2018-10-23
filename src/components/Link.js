import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import { colors, fontFamily, fluidRange, breakpoints } from '../style'

const A = styled.a`
  font-size: ${fluidRange({ min: 14, max: 18 })};
  font-family: ${fontFamily};
  font-weight: ${props => (props.thin ? 400 : 500)};
  text-decoration: underline;
  color: ${props => props.textColor || colors.blue};

  @media screen and ${breakpoints.medium} {
    font-size: ${20 / 15.2}vw;
  }
`

export default function Link(props) {
  return <A as={props.to ? GatsbyLink : undefined} {...props} />
}
