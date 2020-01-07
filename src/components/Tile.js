import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styled from 'styled-components'
import { H3 } from './Text'
import Tags from './Tags'
import Image, { ImageWrapper } from './Image'
import Awards, { AwardWrapper } from './Awards'
import EmbedPlayer from './EmbedPlayer'

import {
  cover,
  breakpoints,
  fluidRange,
  vw,
  colors,
  easings,
  durations,
} from '../style'

const Link = styled(GatsbyLink)`
  display: flex;
  outline: none;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
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
  height: 100%;

  @media ${breakpoints.medium} {
    padding: ${vw(40)};
  }

  ${Link}:hover &,
  ${Link}:focus & {
    ${AwardWrapper} {
      opacity: 0.4;
      transition: opacity ${durations.slow} ${easings.easeOutSine};
    }
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
    background-color: ${colors.dark};
    opacity: 0;
    transition: opacity ${durations.slow} ${easings.easeOutSine};
  }

  ${Link}:hover &,
  ${Link}:focus & {
    &::before {
      opacity: 0.8;
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
  video,
  url,
  tags,
  awards,
  bg = colors.steel500,
}) {
  return (
    <Link to={url}>
      <Article>
        <Content>
          <H3 textColor={colors.light} mb={[1 / 2, 1 / 2]}>
            {title}
          </H3>
          <Tags
            items={tags}
            textColor={colors.light}
            linked={false}
            variant="small"
          />
          {awards && <Awards items={awards} />}
        </Content>
        <Media bg={bg}>
          {image && !video && (
            <Image fluid={image.fluid} alt="" aspectRatio="auto" />
          )}
          {video && (
            <EmbedPlayer
              data-desktop
              src={`${video}?background=1`}
              bg="transparent"
            />
          )}
        </Media>
      </Article>
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
      ...GatsbyImageSharpFluid_withWebp
    }
  }
`
