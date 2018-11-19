import React from 'react'
import { graphql, Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { H1, H2 } from '../components/Text'
import { Grid, CssGrid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Section from '../components/Section'
import Link from '../components/Link'
import Card from '../components/Card'
import Tile from '../components/Tile'
import Div from '../components/Div'
import Hero from '../components/Hero'
import Playground from '../components/Playground'
import InstagramGrid from '../components/InstagramGrid'
import BoxSection from '../components/BoxSection'
import { colors, breakpoints, vw } from '../style'
import pageRoutes from '../routes'

const routes = pageRoutes.reduce((acc, i) => {
  acc[i.id] = i.link
  return acc
}, {})

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
      <Section py={[8, 15]}>
        <CaseGrid>
          {data.cases.edges.map(({ node }) => (
            <Tile
              key={node.id}
              url={node.fields.slug}
              title={node.frontmatter.client}
              image={node.frontmatter.image}
              tags={node.frontmatter.tags}
              mb="0"
            />
          ))}
        </CaseGrid>
        <Grid>
          <Column>
            <Div mt={[3, 6]}>
              <Link as={GatsbyLink} to={routes.case}>
                Fler case
              </Link>
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
            <Column key={node.id} tablet="6" bottomGap>
              <Card
                date={node.frontmatter.date}
                title={node.frontmatter.title}
                url={node.fields.slug}
                image={node.frontmatter.image}
              />
            </Column>
          ))}
          <Column>
            <Div mt={[3, 2]}>
              <Link as={GatsbyLink} to={routes.news}>
                Fler inlägg
              </Link>
            </Div>
          </Column>
        </Grid>
      </Section>
      <Section pt={[15, 25]}>
        <BoxSection
          backgroundImage={data.careerImage.childImageSharp.fluid}
          title="Vill du längta till måndag? "
          excerpt="Bra! Just nu letar vi efter dig som är copywriter, utvecklare eller kundansvarig. Och som vill ha en helt ny, otippad favoritdag."
          link={{ text: 'Bli en av oss', href: routes.career }}
          boxBg={colors.pinkPeach}
        />
      </Section>
      <Section bg={colors.dark} pt="0" mt={[8, 25]}>
        <InstagramGrid />
        <Div pt={[12, 18]} pb={[6, 14]}>
          <Grid>
            <Column>
              <H1 as="h2" textColor="white">
                Kontakt är det bästa vi vet
              </H1>
              <H2 as={Link} href="/" textColor="white">
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
            image {
              childImageSharp {
                fluid(
                  quality: 80
                  srcSetBreakpoints: [365, 520, 724, 960, 1200, 1440]
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
            image {
              childImageSharp {
                fluid(
                  maxWidth: 520
                  quality: 80
                  srcSetBreakpoints: [112, 320, 480]
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    careerImage: file(relativePath: { eq: "bli-en-av-oss.jpg" }) {
      childImageSharp {
        fluid(
          maxWidth: 1440
          quality: 80
          srcSetBreakpoints: [365, 520, 880, 1200, 1440]
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const CaseGrid = styled(CssGrid)`
  @media ${breakpoints.medium} {
    grid-auto-flow: row dense;
  }

  > * {
    @media ${breakpoints.medium} {
      grid-row: span 2;
      grid-column: grid-start / span 6;
    }
  }

  > *:nth-child(1),
  > *:nth-child(4),
  > *:nth-child(5) {
    @media ${breakpoints.medium} {
      grid-row: span 5;
      min-height: ${vw(752)};
    }
  }

  > *:nth-child(2),
  > *:nth-child(4) {
    @media ${breakpoints.medium} {
      grid-column-start: col-end 6;
    }
  }

  > *:nth-child(5) {
    grid-column: grid;
  }
`
