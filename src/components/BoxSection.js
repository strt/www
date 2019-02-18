import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import Image from './Image'
import { H2, Text } from './Text'
import { CssGrid } from './Grid'
import { breakpoints, colors, fluidRange, vw } from '../style'

const Background = styled.div`
  grid-column: full-start/col-end 12;
  grid-row: 1/3;
  background-color: ${colors.steel500};

  img {
    width: 100%;
    object-fit: cover;
  }

  @media ${breakpoints.medium} {
    grid-column: full-start/col-end 11;
    grid-row: 1/6;
  }
`

const Box = styled.div`
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
`

export default function BoxSection({
  backgroundImage,
  title,
  excerpt,
  link,
  boxBg,
}) {
  return (
    <CssGrid>
      <Background>
        {backgroundImage && <Image fluid={backgroundImage} alt="" />}
      </Background>
      <Box bg={boxBg}>
        <H2 mb={[2, 4]}>{title}</H2>
        <Text>{excerpt}</Text>
        {link && (
          <Link href={link.href} colorVariant="blue" variant="large">
            {link.text}
          </Link>
        )}
      </Box>
    </CssGrid>
  )
}
