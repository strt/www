import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { H1, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Section from '../components/Section'
import Link from '../components/Link'

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
      <Section>
        <Grid>
          <Column tablet="8">
            <H1>
              Vi är en kommunikationsbyrå designing and building beautiful
              digital products, brands, and experiences.
            </H1>
          </Column>
        </Grid>
      </Section>
      <Cover />
      <Section>
        <Grid>
          <Column tablet="8">
            <Excerpt>
              Äng kan helt själv vi faktor om, icke annan vemod vi ser, samma
              björnbär i rännil mot. Både oss sin erfarenheter tid enligt
              dimmhöljd och jäst söka rännil göras, sjö vemod för när smultron
              nya gör plats vid stig är strand.
            </Excerpt>
            <Link to="/vad-vi-gor">Se vad vi gör</Link>
          </Column>
        </Grid>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 5
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
