import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { H1, H2, Text, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Section from '../components/Section'
import Link from '../components/Link'

export default function Index({ data }) {
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
      <Section>
        <Grid>
          <Column>
            <H2>Case</H2>
            {data.cases.edges.map(({ node }) => (
              <Text key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  {node.frontmatter.client} – {node.frontmatter.title}
                </Link>
              </Text>
            ))}
            <Link to="/case">Fler case</Link>
          </Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Column>
            <H2>Aktuellt</H2>
            {data.articles.edges.map(({ node }) => (
              <Text key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  {node.frontmatter.date} – {node.frontmatter.title}
                </Link>
              </Text>
            ))}
            <Link to="/case">Fler inlägg</Link>
          </Column>
        </Grid>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query {
    cases: allMarkdownRemark(
      limit: 5
      filter: { fileAbsolutePath: { regex: "/case/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            client
            tags
            image
          }
        }
      }
    }
    articles: allMarkdownRemark(
      limit: 4
      filter: { fileAbsolutePath: { regex: "/aktuellt/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            image
          }
        }
      }
    }
  }
`
