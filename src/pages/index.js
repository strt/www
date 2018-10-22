import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { H1, H2, Text, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Section from '../components/Section'
import Link from '../components/Link'
import Card from '../components/Card'
import Div from '../components/Div'
import InstagramGrid from '../components/InstagramGrid'
import { colors } from '../style'

export default function Index({ data }) {
  return (
    <Layout
      title="Kommunikationsbyrån som gör skillnad"
      description="Välkommen till Strateg! Här finns fler än 40 strateger med en väldig massa kompetens och ett ovanligt stort engagemang."
    >
      <Section py="14">
        <Grid>
          <Column tablet="8">
            <H1>
              Vi är kommunikationsbyrån som älskar att ta ditt varumärke längre.
            </H1>
          </Column>
        </Grid>
      </Section>
      <Cover />
      <Section py="16">
        <Grid>
          <Column tablet="8">
            <Excerpt>
              Äng kan helt själv vi faktor om, icke annan vemod vi ser, samma
              björnbär i rännil mot. Både oss sin erfarenheter tid enligt
              dimmhöljd och jäst söka rännil göras, sjö vemod för när smultron
              nya gör plats vid stig är strand.
            </Excerpt>
            <Link to="/vad-vi-gor/">Se vad vi gör</Link>
          </Column>
        </Grid>
      </Section>
      <Section py="8">
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
            <Link to="/case/">Fler case</Link>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.gray100} pt="0" pb="10">
        <Div halfTopBg="white" mb="4">
          <Grid>
            <Column>
              <H2>Aktuellt</H2>
            </Column>
          </Grid>
        </Div>
        <Grid>
          {data.articles.edges.map(({ node }) => (
            <Column tablet="6">
              <Card
                date={node.frontmatter.date}
                title={node.frontmatter.title}
                url={node.fields.slug}
                image={node.frontmatter.image}
              />
            </Column>
          ))}
          <Column>
            <Div mt="3">
              <Link to="/aktuellt/">Fler inlägg</Link>
            </Div>
          </Column>
        </Grid>
      </Section>
      <Section pt="5" pb="10">
        <Grid justifyContent="center">
          <Column tablet="10">
            <InstagramGrid />
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.black} pt={[4, 8, 9]} pb={[6, 3, 9]}>
        <Grid>
          <Column>
            <H1 as="h2" textColor="white">
              Kontakt är det bästa vi vet
            </H1>
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
