import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import { H3, Text } from './Text'
import dayjs from '../utils/date'
import { colors, ratio, breakpoints, cover, vw } from '../style'

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
  padding: ${12 / 3.75}vw;
  width: ${(100 / 12) * 8}%;
  background-color: white;

  h3 {
    margin-bottom: 0;
    text-decoration: underline;
  }

  @media ${breakpoints.medium} {
    padding: ${vw(24)};
    width: 50%;
  }
`

const ImageWrapper = styled.div`
  ${ratio({ x: 4, y: 3 })}
  width: ${(100 / 12) * 4}%;
  background-color: ${colors.steel};

  @media ${breakpoints.medium} {
    width: 50%;
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
          <img src={image} alt="" />
        </ImageWrapper>
      </Article>
    </Link>
  )
}
