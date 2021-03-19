import React, { useMemo } from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { P1, Text } from './Text'
import Image from './Image'
import {
  colors,
  ratio,
  breakpoints,
  cover,
  fluidRange,
  vw,
  easings,
  durations,
} from '../style'
import { getWidth } from './Grid'

const Link = styled(GatsbyLink)`
  display: block;
  outline: none;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
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
  background-color: ${colors.light};

  p {
    margin-bottom: 0;

    /* Copy/mimic Link component style */
    & span {
      transition: background ${durations.fast} ${easings.easeInQuad};

      ${Link}:hover & {
        text-decoration: underline;
      }

      ${Link}.focus-visible & {
        text-decoration: underline;
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

const DateTime = styled(Text)`
  font-size: 1rem;
  line-height: 1.4;

  @media ${breakpoints.medium} {
    font-size: 1.125rem;
  }
`

const ImageWrapper = styled.div`
  ${ratio({ x: 4, y: 3 })}
  width: ${getWidth(4)};
  overflow: hidden;

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
            <DateTime
              as="time"
              dateTime={date}
              textColor={colors.grey600}
              mb="2"
            >
              {formattedDate}
            </DateTime>
          )}
          <P1>
            <span>{title}</span>
          </P1>
        </Content>
        <ImageWrapper>
          {image && (
            <Image
              fluid={image.fluid}
              sizes="(min-width: 768px) 30vw, 50vw"
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
    fluid(quality: 80, srcSetBreakpoints: [200, 340, 520]) {
      ...GatsbyImageSharpFluid_withWebp
    }
  }
`
