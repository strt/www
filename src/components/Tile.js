import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styled from 'styled-components'
import { H3 } from './Text'
import Tags from './Tags'
import Image from './Image'
import { cover, breakpoints, fluidRange, vw, colors } from '../style'

const Link = styled(GatsbyLink)`
  display: flex;
  text-decoration: none;
`

const Wrapper = styled.article`
  position: relative;
  flex-grow: 1;
  min-height: ${fluidRange({ min: 280, max: 320 })};

  @media ${breakpoints.medium} {
    min-height: ${vw(480)};
  }
`

const Content = styled.div`
  padding: ${fluidRange({ min: 16, max: 24 })};
  background-image: linear-gradient(black, transparent);

  @media ${breakpoints.medium} {
    padding: ${vw(40)};
  }
`

const Media = styled(Image)`
  ${cover()}
  z-index: -1;
  background-color: ${colors.steel};
`

export default function Tile({ title, image, url, tags }) {
  return (
    <Link to={url}>
      <Wrapper>
        <Content>
          <H3 textColor="white" mb={[1 / 2, 1 / 2]}>
            {title}
          </H3>
          <Tags items={tags} textColor="white" linked={false} variant="small" />
        </Content>
        {image && <Media fluid={image.childImageSharp.fluid} alt="" />}
      </Wrapper>
    </Link>
  )
}

export const query = graphql`
  fragment TileImage on ImageSharp {
    fluid(
      quality: 80
      maxWidth: 1440
      srcSetBreakpoints: [365, 520, 724, 960, 1200, 1440]
    ) {
      ...GatsbyImageSharpFluid
    }
  }
`
