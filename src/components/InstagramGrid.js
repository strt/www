import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Link from './Link'
import Image from './Image'
import Div from './Div'
import { Grid, Column } from './Grid'
import Fetch from './Fetch'
import Icon from './Icon'
import { colors, breakpoints, cover } from '../style'

const placeholderItems = Array.from(Array(5)).map((v, i) => ({ id: i }))

function Posts({ posts = placeholderItems, halfTopBg = 'white', ...props }) {
  return (
    <Wrapper halfTopBg={halfTopBg} {...props}>
      <Grid justifyContent="center">
        <Column tablet="10">
          <ImageGrid>
            {posts.map(post => (
              <Box key={post.id}>
                {(() => {
                  if (post.videos) {
                    return (
                      <video
                        poster={post.images.standard_resolution.url}
                        autoPlay
                        muted
                        loop
                      >
                        <source
                          type="video/mp4"
                          src={post.videos.standard_resolution.url}
                        />
                      </video>
                    )
                  }

                  if (post.images) {
                    return (
                      <Image
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
                    file(relativePath: { eq: "settings.json" }) {
                      siteSettings: childContentJson {
                        social {
                          instagram
                        }
                      }
                    }
                  }
                `}
              >
                {({ file: { siteSettings } }) => (
                  <Link
                    href={siteSettings.social.instagram}
                    variant="large"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={['fab', 'instagram']} />
                    <span>Följ enstrateg</span>
                  </Link>
                )}
              </StaticQuery>
            </Box>
          </ImageGrid>
        </Column>
      </Grid>
    </Wrapper>
  )
}

export default function InstagramGrid(props) {
  return (
    <Fetch url="/.netlify/functions/instagram">
      {({ data }) => <Posts posts={data} {...props} />}
    </Fetch>
  )
}

const Wrapper = styled(Div)`
  &::before {
    height: 64%;

    @media ${breakpoints.medium} {
      height: ${(3 / 5) * 100}%;
    }
  }
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and ${breakpoints.medium} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Box = styled.div`
  position: relative;
  height: 0;
  overflow: hidden;
  padding-top: 100%;
  background-image: linear-gradient(to top left, black, gray);

  & > * {
    ${cover()}

    & img {
      object-fit: inherit;
      height: inherit;
    }
  }

  & a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: ${colors.blue500};

    &:hover {
      background-color: ${colors.blue700};
    }

    &.focus-visible {
      background-color: ${colors.blue900};
    }

    & svg {
      margin-bottom: 0.5em;
      font-size: 1.2em;
    }
  }

  &:nth-child(1) {
    grid-column: 1;
    grid-row: 1 / 3;

    @media ${breakpoints.medium} {
      grid-column: 2;
      grid-row: 1 / 3;
    }
  }

  &:nth-child(2) {
    grid-column: 2;
    grid-row: 2 / 4;

    @media ${breakpoints.medium} {
      grid-column: 3;
      grid-row: 2 / 4;
    }
  }

  &:nth-child(3) {
    grid-column: 1;
    grid-row: 3 / 5;

    @media ${breakpoints.medium} {
      grid-column: 1;
    }
  }

  &:nth-child(4) {
    grid-row: 4 / 6;

    @media ${breakpoints.medium} {
      grid-row: 3 / 5;
    }
  }

  &:nth-child(5) {
    grid-column: 1;
    grid-row: 5 / 7;

    @media ${breakpoints.medium} {
      grid-column: 4;
      grid-row: 3 / 5;
    }
  }

  &:nth-child(6) {
    grid-column: 2;
    grid-row: 6 / 8;

    @media ${breakpoints.medium} {
      grid-column: 3;
      grid-row: 4 / 6;
    }
  }
`
