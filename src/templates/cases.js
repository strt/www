import React, { useState } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Div from '../components/Div'
import Section from '../components/Section'
import Tile from '../components/Tile'
import Link from '../components/Link'
import { H1, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import {
  breakpoints,
  fluidRange,
  vw,
  easings,
  animations,
  durations,
} from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'

function filterCases(items, filter) {
  return items.filter(({ node }) =>
    node.frontmatter.tags.some(
      i => !filter || i.toLowerCase() === filter.toLowerCase(),
    ),
  )
}

function getTagLink(tag) {
  return `?filter=${encodeURIComponent(tag.toLowerCase())}`
}

const Filter = styled(Div)`
  display: flex;
  flex-wrap: wrap;

  a {
    margin-bottom: ${fluidRange({ min: 12, max: 24 })};

    &:not(:last-child) {
      margin-right: ${fluidRange({ min: 16, max: 32 })};
    }

    @media ${breakpoints.medium} {
      margin-bottom: ${vw(32)};

      &:not(:last-child) {
        margin-right: ${vw(48)};
      }
    }
  }
`

const Animation = styled.div`
  animation: ${animations.fadeIn} ${durations.normal} ${easings.easeOutSine}
    120ms both;
`

export default function Case({ data, location }) {
  const [filter, setFilter] = useState(
    () => queryString.parse(location.search).filter || null,
  )

  function onTagClick(event) {
    event.preventDefault()
    const { target } = event
    const { filter: nextFilter } = queryString.parse(target.search)
    setFilter(nextFilter)
    window.history.replaceState({}, null, target.pathname + target.search)
  }

  const { title, excerpt } = data.page.frontmatter

  const cases = filterCases(data.cases.edges, filter)
  const tags = data.cases.edges
    .reduce((acc, { node }) => {
      node.frontmatter.tags.forEach(tag => {
        if (acc.indexOf(tag) === -1) {
          acc.push(tag)
        }
      })

      return acc
    }, [])
    .sort()

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt}</Excerpt>
        <Filter>
          <Link
            href={location.pathname}
            onClick={onTagClick}
            aria-current={!filter ? true : undefined}
            colorVariant="gray"
            variant="large"
          >
            Alla projekt
          </Link>
          {tags.map(tag => (
            <Link
              key={tag}
              href={getTagLink(tag)}
              onClick={onTagClick}
              colorVariant="gray"
              variant="large"
              aria-current={
                filter && filter.includes(tag.toLowerCase()) ? true : undefined
              }
            >
              {tag}
            </Link>
          ))}
        </Filter>
      </Hero>
      <Animation key={filter}>
        <Section pb={[15, 25]}>
          <Grid>
            {cases.map(({ node }) => (
              <Column key={node.id} md="6" bottomGap>
                <Tile
                  url={node.fields.slug}
                  title={node.frontmatter.client}
                  image={node.frontmatter.image}
                  tags={node.frontmatter.tags}
                  bg={node.frontmatter.color}
                />
              </Column>
            ))}
          </Grid>
        </Section>
      </Animation>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        excerpt
        seo {
          title
          description
          image {
            childImageSharp {
              og: resize(width: 1200, height: 630, quality: 80) {
                src
              }
            }
          }
        }
      }
    }
    cases: allMdx(
      filter: {
        fields: { template: { eq: "case" } }
        frontmatter: { published: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            client
            tags
            color
            image {
              childImageSharp {
                ...TileImage
              }
            }
          }
        }
      }
    }
  }
`
