import React, { useMemo } from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styled from 'styled-components'
import { rgba } from 'polished'
import { H3, Text } from './Text'
import Image from './Image'
import dayjs from '../utils/date'
import {
  colors,
  ratio,
  breakpoints,
  cover,
  fluidRange,
  vw,
  easings,
} from '../style'
import { getWidth } from './Grid'

const Link = styled(GatsbyLink)`
  display: block;
  outline: none;
  text-decoration: none;
`

const Article = styled.article`
  display: flex;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${fluidRange({ min: 16, max: 24 })};
  width: ${getWidth(8)};
  background-color: white;

  h3 {
    margin-bottom: 0;

    /* Copy/mimic Link component style */
    & span {
      text-decoration: underline;
      transition: background 120ms ${easings.easeInQuad};

      ${Link}:hover & {
        background-color: ${rgba(colors.dark, 0.1)};
      }

      ${Link}.focus-visible & {
        background-color: ${rgba(colors.dark, 0.2)};
      }

      ${Link}:active & {
        text-decoration: none;
      }
    }
  }

  @media ${breakpoints.medium} {
    padding: ${vw(24)};
    width: ${getWidth(6)};
  }
`

const ImageWrapper = styled.div`
  ${ratio({ x: 4, y: 3 })}
  width: ${getWidth(4)};
  overflow: hidden;
  background-color: ${colors.steel500};

  @media ${breakpoints.medium} {
    width: ${getWidth(6)};
  }

  * {
    ${cover()}
  }
`

export default function Card({ url, title, date, image }) {
  const formattedDate = useMemo(
    () => (date ? dayjs(date).format('D MMM YYYY') : null),
    [date],
  )

  return (
    <Link to={url}>
      <Article>
        <Content>
          {date && (
            <Text as="time" dateTime={date} textColor={colors.steel500} mb="2">
              {formattedDate}
            </Text>
          )}
          <H3>
            <span>{title}</span>
          </H3>
        </Content>
        <ImageWrapper>
          {image && (
            <Image
              fluid={image.childImageSharp.fluid}
              sizes="(min-width: 768px) 20vw, 30vw"
              aspectRatio="auto"
              alt=""
            />
          )}
        </ImageWrapper>
      </Article>
    </Link>
  )
}

export const query = graphql`
  fragment CardImage on ImageSharp {
    fluid(quality: 70, srcSetBreakpoints: [200, 340, 420]) {
      ...GatsbyImageSharpFluid
    }
  }
`
