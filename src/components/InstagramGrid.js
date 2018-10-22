import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Link from './Link'
import Fetch from './Fetch'
import Icon from './Icon'
import { colors, breakpoints } from '../style'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and ${breakpoints.medium} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Box = styled.div`
  position: relative;
  height: 0;
  padding-top: 100%;
  background-image: linear-gradient(to top left, black, gray);

  & > * {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: ${colors.blue500};

    & svg {
      margin-bottom: 0.5em;
      font-size: 1.2em;
    }
  }

  &:nth-child(1) {
    grid-column: 2;
    grid-row: 1 / 3;
  }

  &:nth-child(2) {
    grid-column: 3;
    grid-row: 2 / 4;
  }

  &:nth-child(3) {
    grid-row: 3 / 5;
  }

  &:nth-child(4) {
    grid-row: 3 / 5;
  }

  &:nth-child(5) {
    grid-column: 3;
    grid-row: 4 / 6;

    @media screen and ${breakpoints.medium} {
      grid-column: 4;
      grid-row: 3 / 5;
    }
  }

  &:nth-child(6) {
    grid-column: 2;
    grid-row: 5 / 8;

    @media screen and ${breakpoints.medium} {
      grid-column: 3;
      grid-row: 4 / 6;
    }
  }
`

const placeholderItems = Array.from(Array(5)).map((v, i) => ({ id: i }))

function Posts({ posts = placeholderItems }) {
  return (
    <Grid>
      {posts.map(post => (
        <Box key={post.id}>
          {(() => {
            if (post.videos) {
              return (
                <video
                  src={post.videos.standard_resolution.url}
                  poster={post.images.standard_resolution.url}
                  autoPlay
                  muted
                  loop
                />
              )
            }

            if (post.images) {
              return (
                <img
                  src={post.images.standard_resolution.url}
                  alt={post.caption}
                />
              )
            }

            return null
          })()}
        </Box>
      ))}
      <Box>
        <StaticQuery
          query={graphql`
            query {
              site {
                siteMetadata {
                  instagram
                }
              }
            }
          `}
        >
          {({ site: { siteMetadata } }) => (
            <Link
              href={siteMetadata.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={['fab', 'instagram']} />
              <span>Följ enstrateg</span>
            </Link>
          )}
        </StaticQuery>
      </Box>
    </Grid>
  )
}

export default function InstagramGrid() {
  return (
    <Fetch url="/.netlify/functions/instagram">
      {({ data }) => <Posts posts={data} />}
    </Fetch>
  )
}
