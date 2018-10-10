import React from 'react'
import { graphql, Link as GatsbyLink } from 'gatsby'
import Layout from '../components/Layout'
import { Text, Excerpt, H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Link from '../components/Link'

export default function Case({ data }) {
  const cases = data.allMarkdownRemark.edges.map(({ node }) => ({
    ...node,
    title: node.frontmatter.title,
    client: node.frontmatter.client,
    subtitle: node.frontmatter.title,
    link: node.fields.slug,
  }))

  return (
    <Layout title="Case">
      <Grid>
        <Column>
          <H1>En rubrik för case.</H1>
          <Excerpt>Vi gillar det vi gör.</Excerpt>
          {cases.map(i => (
            <Text key={i.link}>
              <Link as={GatsbyLink} to={i.link}>
                {i.client} – {i.title}
              </Link>
            </Text>
          ))}
        </Column>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            client
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
