import React from 'react'
import styled from 'styled-components'
import { H2, Text } from './Text'
import Link from './Link'
import { fluidRange, colors, breakpoints, vw } from '../style'

const StyledBox = styled.div`
  position: relative;
  z-index: 2;
  padding: ${fluidRange({ min: 24, max: 32 })};
  background-color: ${props => props.bg || colors.ice};
  grid-column: col-start 2 / col-end 12;
  grid-row: 2/5;

  @media ${breakpoints.medium} {
    padding: ${vw(120)};
    grid-column: col-start 6 / col-end 11;
    grid-row: 5/7;
  }

  *:last-child {
    margin-bottom: 0;
  }
`

export default function Box({ title, content, link, ...props }) {
  return (
    <StyledBox {...props}>
      <H2 mb={[2, 4]}>{title}</H2>
      <Text>{content}</Text>
      {link && (
        <Link href={link.href} colorVariant="blue" variant="large">
          {link.text}
        </Link>
      )}
    </StyledBox>
  )
}
