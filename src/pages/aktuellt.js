import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { Text, H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function News({ data }) {
  const articles = data.allMarkdownRemark.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    link: node.fields.slug,
  }))

  return (
    <Layout title="Aktuellt">
      <Grid>
        <Column>
          <H1>Aktuellt</H1>
          {articles.map(i => (
            <Text key={i.link}>
              <Link as={GatsbyLink} to={i.link}>
                {i.title}
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/aktuellt/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            client
            title
            image
          }
        }
      }
    }
  }
`
