import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Tile from '../components/Tile'
import { H1, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function Case({ data }) {
  return (
    <Layout title="Case">
      <Grid>
        <Column tablet="8">
          <H1>En rubrik för case.</H1>
          <Excerpt>Vi gillar det vi gör.</Excerpt>
        </Column>
      </Grid>
      <Section pt="3" pb="8">
        <Grid>
          {data.cases.edges.map(({ node }) => (
            <Column key={node.id} tablet="6">
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
