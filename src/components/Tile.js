import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styled from 'styled-components'
import { H3 } from './Text'
import Tags from './Tags'
import Image, { ImageWrapper } from './Image'
import { cover, breakpoints, fluidRange, vw, colors, easings } from '../style'

const Link = styled(GatsbyLink)`
  display: flex;
  text-decoration: none;
`

const Article = styled.article`
  position: relative;
  flex-grow: 1;
  min-height: ${fluidRange({ min: 280, max: 320 })};

  @media ${breakpoints.medium} {
    min-height: ${vw(480)};
  }
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: ${fluidRange({ min: 16, max: 24 })};

  @media ${breakpoints.medium} {
    padding: ${vw(40)};
  }
`

const Media = styled.div`
  ${cover()}
  z-index: 1;
  overflow: hidden;
  background-color: ${props => props.bg};

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.bg};
    opacity: 0;
    transition: opacity 320ms ${easings.easeOutSine};
  }

  ${Article}:hover &,
  &:hover {
    &::before {
      opacity: 0.8;
    }

    & img {
      filter: grayscale(1);
    }
  }

  ${ImageWrapper} {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default function Tile({
  title,
  image,
  url,
  tags,
  bg = colors.steel500,
}) {
  return (
    <Link to={url}>
      <Article>
        <Content>
          <H3 textColor="white" mb={[1 / 2, 1 / 2]}>
            {title}
          </H3>
          <Tags items={tags} textColor="white" linked={false} variant="small" />
        </Content>
        {image && (
          <Media bg={bg}>
            <Image
              fluid={image.childImageSharp.fluid}
              alt=""
              aspectRatio="auto"
            />
          </Media>
        )}
      </Article>
    </Link>
  )
}

export const query = graphql`
  fragment TileImage on ImageSharp {
    fluid(
      quality: 70
      maxWidth: 1440
      srcSetBreakpoints: [365, 520, 724, 960, 1200, 1440]
    ) {
      ...GatsbyImageSharpFluid
    }
  }
`
