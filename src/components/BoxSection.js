import React from 'react'
import styled from 'styled-components'
import Image from './Image'
import { CssGrid } from './Grid'
import { breakpoints, colors } from '../style'
import Box from './Box'

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

const StyledBox = styled(Box)`
  position: relative;
  z-index: 2;
  grid-column: col-start 2 / col-end 12;
  grid-row: 2/5;

  @media ${breakpoints.medium} {
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
      <StyledBox bg={boxBg} title={title} content={excerpt} link={link} />
    </CssGrid>
  )
}
