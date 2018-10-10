import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { Text, Excerpt, H1 } from '../components/Text'
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
          <H1>Det senaste från Strateg</H1>
          <Excerpt>
            Vad händer på Strateg? Vad händer i vår omvärld? Här hittar du både
            nyheter och våra egna reflektioner kring spännande fenomen i vår
            samtid. Stort och smått. Självklart och oväntat. Saker som berör
            oss, helt enkelt – och förhoppningsvis även dig.
          </Excerpt>
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
