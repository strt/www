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
import { breakpoints, fluidRange, vw, easings, animations } from '../style'

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
  animation: ${animations.fadeIn} 220ms 120ms ${easings.easeOutSine} both;
`

export default class Case extends React.Component {
  state = {
    filter: queryString.parse(this.props.location.search).filter || null,
  }

  onTagClick = (event) => {
    event.preventDefault()
    const { target } = event
    const { filter } = queryString.parse(target.search)
    this.setState({ filter })
    window.history.replaceState({}, null, target.pathname + target.search)
  }

  render() {
    const { data, location } = this.props
    const { filter } = this.state
    const { title, excerpt } = data.page.frontmatter

    const cases = filterCases(data.cases.edges, filter)
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
          <H1>{title}</H1>
          <Excerpt>{excerpt}</Excerpt>
          <Filter>
            <Link
              href={location.pathname}
              onClick={this.onTagClick}
              aria-current={!filter ? true : undefined}
              colorVariant="blue"
              variant="large"
            >
              Alla projekt
            </Link>
            {tags.map(tag => (
              <Link
                key={tag}
                href={getTagLink(tag.toLowerCase())}
                onClick={this.onTagClick}
                colorVariant="blue"
                variant="large"
                aria-current={
                  filter && filter.includes(tag.toLowerCase())
                    ? true
                    : undefined
                }
              >
                {tag}
              </Link>
            ))}
          </Filter>
        </Hero>
        <Animation key={filter}>
          <Section pb={[10, 20]}>
            <Grid>
              {cases.map(({ node }) => (
                <Column key={node.id} tablet="6" bottomGap>
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
}

export const query = graphql`
  query {
    page: markdownRemark(fileAbsolutePath: { regex: "/pages/case/" }) {
      frontmatter {
        title
        excerpt
      }
    }
    cases: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/case/" } }
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
