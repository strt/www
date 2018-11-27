import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styled from 'styled-components'
import { H3, Text } from './Text'
import Image from './Image'
import dayjs from '../utils/date'
import { colors, ratio, breakpoints, cover, fluidRange, vw } from '../style'
import { getWidth } from './Grid'

const Link = styled(GatsbyLink)`
  display: block;
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
    text-decoration: underline;
  }

  @media ${breakpoints.medium} {
    padding: ${vw(24)};
    width: ${getWidth(6)};
  }
`

const ImageWrapper = styled.div`
  ${ratio({ x: 4, y: 3 })}
  width: ${getWidth(4)};
  background-color: ${colors.steel};

  @media ${breakpoints.medium} {
    width: ${getWidth(6)};
  }

  * {
    ${cover()}
  }
`

export default function Card({ url, title, date, image }) {
  const formattedDate = dayjs(date).format('D MMM YYYY')

  return (
    <Link to={url}>
      <Article>
        <Content>
          <Text as="time" dateTime={date} textColor={colors.steel} mb="2">
            {formattedDate}
          </Text>
          <H3>{title}</H3>
        </Content>
        <ImageWrapper>
          {image && <Image fluid={image.childImageSharp.fluid} alt="" />}
        </ImageWrapper>
      </Article>
    </Link>
  )
}

export const query = graphql`
  fragment CardImage on ImageSharp {
    fluid(maxWidth: 520, quality: 80, srcSetBreakpoints: [112, 320, 480]) {
      ...GatsbyImageSharpFluid
    }
  }
`
