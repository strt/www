import React, { useContext, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import queryString from 'query-string'
import { ThemeContext } from '../context/ThemeContext'
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
import { getActiveLangPath } from '../components/SelectLanguage'

function filterCases(items, filter) {
  return items.filter(({ node }) =>
    node.tags.some(
      i => !filter || i.name.toLowerCase() === filter.toLowerCase(),
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
    line-height: 1.2em;

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
  const theme = useContext(ThemeContext)
  if (theme.dark) theme.toggleDark()

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

  const { title, excerpt } = data.contentfulPage
  const cases = filterCases(data.cases.edges, filter)
  const tags = data.tags.edges

  const renderFilter = true // Set to true to enable filter on tags again when we have enough cases published to require a filter

  return (
    <Layout meta={getMetaFromPost(data.contentfulPage)}>
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt.excerpt}</Excerpt>
        {renderFilter === true && (
          <Filter>
            <Link
              href={location.pathname}
              onClick={onTagClick}
              aria-current={!filter ? true : undefined}
              colorVariant="gray"
              variant="large"
            >
              {getActiveLangPath() ? 'Alla projekt' : 'All projects'}
            </Link>
            {tags.map(tag => (
              <Link
                key={tag.node.name}
                href={getTagLink(tag.node.name)}
                onClick={onTagClick}
                colorVariant="gray"
                variant="large"
                aria-current={
                  filter && filter.includes(tag.node.name.toLowerCase())
                    ? true
                    : undefined
                }
              >
                {tag.node.name}
              </Link>
            ))}
          </Filter>
        )}
      </Hero>
      <Animation key={filter}>
        <Section pb={[15, 25]}>
          <Grid>
            {cases.map(({ node }) => (
              <Column key={node.id} md="6" bottomGap>
                <Tile
                  url={`${getActiveLangPath()}/work/${node.slug}`}
                  image={node.featuredImage}
                  tags={node.tags}
                  title={node.client.name}
                  awards={node.awards}
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
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulPages(
      slug: { eq: $slug }
      node_locale: { eq: $locale }
    ) {
      title
      excerpt {
        excerpt
      }
      seoTitle
      seoDescription {
        seoDescription
      }
      seoImage {
        og: resize(width: 1200, height: 630, quality: 80) {
          src
        }
      }
    }
    tags: allContentfulTags(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          name
        }
      }
    }
    cases: allContentfulCases(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [createdAt], order: [DESC] }
    ) {
      edges {
        node {
          id
          slug
          title
          createdAt
          featuredImage {
            fluid(quality: 80) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          tags {
            name
          }
          client {
            name
          }
          awards {
            contentful_id
            description
            title
            fluid: fluid(quality: 80, maxWidth: 500) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
