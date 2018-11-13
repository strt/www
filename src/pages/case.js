import React from 'react'
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
import { breakpoints, fluidRange } from '../style'

function filterCases(items, filter) {
  return items.filter(({ node }) =>
    node.frontmatter.tags.some(
      i => !filter || i.toLowerCase() === filter.toLowerCase(),
    ),
  )
}

const Filter = styled(Div)`
  display: flex;
  flex-wrap: wrap;

  ${Link} {
    margin-bottom: ${fluidRange({ min: 12, max: 24 })};

    &:not(:last-child) {
      margin-right: ${fluidRange({ min: 16, max: 32 })};
    }

    @media ${breakpoints.medium} {
      margin-bottom: ${32 / 15.2}vw;

      &:not(:last-child) {
        margin-right: ${48 / 15.2}vw;
      }
    }
  }
`

export default function Case({ data, location, navigate }) {
  const cases = filterCases(
    data.cases.edges,
    queryString.parse(location.search).filter,
  )
  const tags = data.cases.edges
    .reduce((acc, { node }) => {
      node.frontmatter.tags.forEach((tag) => {
        if (acc.indexOf(tag) === -1) {
          acc.push(tag)
        }
      })

      return acc
    }, [])
    .sort()

  return (
    <Layout title="Case">
      <Hero>
        <H1>Vi gillar det vi gör.</H1>
        <Excerpt>
          Det här är resultatet av analyser, breifer, strategier, manus,
          Slack-konversationer, postit-lappar, hackathon, kaffekoppar, skisser …
          Ja, du fattar. Det här är case som visar vad vi gör.
        </Excerpt>
        <Filter>
          <Link
            href={location.pathname}
            onClick={(e) => {
              e.preventDefault()
              navigate(location.pathname, { replace: true })
            }}
          >
            Alla projekt
          </Link>
          {tags.map(tag => (
            <Link
              key={tag}
              href={`${location.pathname}?filter=${encodeURIComponent(
                tag.toLowerCase(),
              )}`}
              onClick={(e) => {
                const { target } = e
                e.preventDefault()
                navigate(target.pathname + target.search, { replace: true })
              }}
            >
              {tag}
            </Link>
          ))}
        </Filter>
      </Hero>
      <Section pb={[10, 20]}>
        <Grid>
          {cases.map(({ node }) => (
            <Column key={node.id} tablet="6" bottomGap>
              <Tile
                url={node.fields.slug}
                title={node.frontmatter.client}
                image={node.frontmatter.image}
                tags={node.frontmatter.tags}
              />
            </Column>
          ))}
        </Grid>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query {
    cases: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/case/" } }
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
            image
          }
        }
      }
    }
  }
`
