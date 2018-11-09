import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Tile from '../components/Tile'
import { H1, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function Case({ data }) {
  return (
    <Layout title="Case">
      <Hero>
        <H1>Vi gillar det vi gör.</H1>
        <Excerpt>
          Det här är resultatet av analyser, breifer, strategier, manus,
          Slack-konversationer, postit-lappar, hackathon, kaffekoppar, skisser …
          Ja, du fattar. Det här är case som visar vad vi gör.
        </Excerpt>
      </Hero>
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
