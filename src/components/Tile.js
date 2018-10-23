import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import { H3, Text } from './Text'
import { cover } from '../style'

const Link = styled(GatsbyLink)`
  text-decoration: none;
`

const Wrapper = styled.div`
  position: relative;
  min-height: ${480 / 15.2}vw;
  margin-bottom: ${32 / 15.2}vw;
`

const Content = styled.div`
  padding: ${40 / 15.2}vw;
  background-image: linear-gradient(black, transparent);
`

const Media = styled.img`
  ${cover()};
  z-index: -1;
`

export default function Tile({ title, image, url }) {
  return (
    <Link to={url}>
      <Wrapper>
        <Content>
          <H3 textColor="white">{title}</H3>
          <Text textColor="white">– Identitet</Text>
        </Content>
        <Media src={image} alt="" />
      </Wrapper>
    </Link>
  )
}
