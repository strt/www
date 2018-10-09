import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function Index({ data }) {
  const cases = data.allMarkdownRemark.edges.map(({ node }) => ({
    ...node,
    ...node.frontmatter,
    title: node.frontmatter.excerpt,
    subtitle: node.frontmatter.title,
    link: node.fields.slug,
  }))

  console.log(cases)

  return (
    <Layout
      title="Kommunikationsbyrån som gör skillnad"
      description="Välkommen till Strateg! Här finns fler än 40 strateger med en väldig massa kompetens och ett ovanligt stort engagemang."
    >
      <Grid>
        <Column medium="6">
          <H1>
            Vi är en kommunikationsbyrå designing and building beautiful digital
            products, brands, and experiences.
          </H1>
        </Column>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 8
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
            date
            image
          }
        }
      }
    }
  }
`
