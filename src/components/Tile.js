import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import { H3 } from './Text'
import Tags from './Tags'
import { cover, breakpoints, fluidRange, vw } from '../style'

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

const Media = styled.img`
  ${cover()}
  z-index: -1;
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
        <Media src={image} alt="" />
      </Wrapper>
    </Link>
  )
}
