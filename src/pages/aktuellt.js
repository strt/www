import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'

import Card from '../components/Card'
import Section from '../components/Section'
import { H1, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { colors } from '../style'

export default function News({ data }) {
  return (
    <Layout title="Aktuellt">
      <Hero>
        <H1>Det senaste från Strateg.</H1>
        <Excerpt>
          Vad händer på Strateg? Vad händer i vår omvärld? Här hittar du både
          nyheter och våra egna reflektioner kring spännande fenomen i vår
          samtid. Stort och smått. Självklart och oväntat. Saker som berör oss,
          helt enkelt – och förhoppningsvis även dig.
        </Excerpt>
      </Hero>
      <Section bg={colors.ice} py={[5, 8]}>
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
        </Grid>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query {
    articles: allMarkdownRemark(
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
