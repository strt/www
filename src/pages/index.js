import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { H1, H2 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Section from '../components/Section'
import Link from '../components/Link'
import Card from '../components/Card'
import Tile from '../components/Tile'
import Div from '../components/Div'
import Hero from '../components/Hero'
import Playground from '../components/Playground'
import InstagramGrid from '../components/InstagramGrid'
import { colors, breakpoints } from '../style'

export default function Index({ data }) {
  return (
    <Layout
      title="Kommunikationsbyrån som gör skillnad"
      description="Välkommen till Strateg! Här finns fler än 40 strateger med en väldig massa kompetens och ett ovanligt stort engagemang."
    >
      <Hero scrollButtonElement="#playground" pt={8}>
        <H1>
          Vi tar ditt varumärke längre. Och vi gör det med ovanligt mycket
          hjärta och engagemang.
        </H1>
      </Hero>
      <Cover id="playground">
        <Playground />
      </Cover>
      <Section py={[6, 15]}>
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
          <Column>
            <Div mt={[3, 3]}>
              <Link to="/case/">Fler case</Link>
            </Div>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.ice} pt="0" pb={[5, 10]}>
        <Div halfTopBg="white" mb={[2, 4]}>
          <Grid>
            <Column>
              <H2>Aktuellt</H2>
            </Column>
          </Grid>
        </Div>
        <Grid>
          {data.articles.edges.map(({ node }) => (
            <Column key={node.id} tablet="6">
              <Card
                date={node.frontmatter.date}
                title={node.frontmatter.title}
                url={node.fields.slug}
                image={node.frontmatter.image}
              />
            </Column>
          ))}
          <Column>
            <Div mt={[3, 3]}>
              <Link to="/aktuellt/">Fler inlägg</Link>
            </Div>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.dark} pt="0" mt={[8, 18]}>
        <Div
          halfTopBg="white"
          css={{
            '&::before': {
              height: '64%',
              [`@media ${breakpoints.medium}`]: { height: `${(3 / 5) * 100}%` },
            },
          }}
        >
          <Grid justifyContent="center">
            <Column tablet="10">
              <InstagramGrid />
            </Column>
          </Grid>
        </Div>
        <Div pt={[12, 18]} pb={[6, 14]}>
          <Grid>
            <Column>
              <H1 as="h2" textColor="white">
                Kontakt är det bästa vi vet
              </H1>
              <H2 as={Link} to="/" textColor="white">
                Vad vill du prata om?
              </H2>
            </Column>
          </Grid>
        </Div>
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
    articles: allMarkdownRemark(
      limit: 4
      filter: { fileAbsolutePath: { regex: "/aktuellt/" } }
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
            date
            image
          }
        }
      }
    }
  }
`
