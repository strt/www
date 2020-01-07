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
import { Excerpt } from '../components/Text'
import { CssGrid } from '../components/Grid'
import { breakpoints, colors, easings, animations, durations } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'
import { getActiveLangPath } from '../components/SelectLanguage'

function filterCases(items, filter) {
  return items.filter(
    ({ node }) =>
      node.tags &&
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
    margin-bottom: 16px;
    font-size: 1.25em;
    line-height: 1.2em;

    &:not(:last-child) {
      margin-right: 16px;
    }

    &:active,
    &[aria-current],
    &[data-partially-current] {
      color: ${colors.darkText};
    }

    @media ${breakpoints.medium} {
      margin-bottom: 16px;

      &:not(:last-child) {
        margin-right: 48px;
      }
    }
  }
`

const Animation = styled.div`
  animation: ${animations.fadeIn} ${durations.normal} ${easings.easeOutSine}
    120ms both;
`

const CaseGrid = styled(CssGrid)`
  @media ${breakpoints.medium} {
    grid-auto-flow: row dense;
  }

  > * {
    @media ${breakpoints.medium} {
      grid-row: span 2;
      grid-column: span 6;
    }
  }

  > *:nth-child(odd) {
    @media ${breakpoints.medium} {
      grid-column: grid-start / span 6;
    }
  }
`

export default function Case({ data, location }) {
  const theme = useContext(ThemeContext)
  if (theme.theme !== 'light') theme.toggleTheme('light')

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

  const { title } = data.contentfulPage
  const cases = filterCases(data.cases.edges, filter)
  const tags = data.tags.edges

  const renderFilter = true // Set to true to enable filter on tags again when we have enough cases published to require a filter

  return (
    <Layout meta={getMetaFromPost(data.contentfulPage)}>
      <Hero>
        <Excerpt as="h1" textColor={theme.color}>
          {title}
        </Excerpt>
        {renderFilter === true && (
          <Filter>
            <Link
              href={location.pathname}
              onClick={onTagClick}
              aria-current={!filter ? true : undefined}
              textColor={theme.color}
              styleVariant={theme.theme}
              variant="large"
            >
              {getActiveLangPath() ? 'Alla projekt' : 'All projects'}
            </Link>
            {tags.map(tag => (
              <Link
                key={tag.node.name}
                href={getTagLink(tag.node.name)}
                onClick={onTagClick}
                textColor={theme.color}
                styleVariant={theme.theme}
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
          <CaseGrid>
            {cases.map(({ node }) => (
              <Tile
                key={node.id}
                url={`${getActiveLangPath()}/work/${node.slug}`}
                image={node.featuredImage}
                tags={node.tags}
                title={node.client.name}
                awards={node.awards}
                bg={node.color}
              />
            ))}
          </CaseGrid>
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
    tags: allContentfulTags(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [name], order: [ASC] }
    ) {
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
            fluid(quality: 80, maxWidth: 2000) {
              ...GatsbyContentfulFluid
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
