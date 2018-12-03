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
  const { title, excerpt } = data.page.frontmatter

  return (
    <Layout title="Aktuellt">
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt}</Excerpt>
      </Hero>
      <Section bg={colors.ice} pt={[5, 8]} pb={[10, 20]}>
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
    page: markdownRemark(fileAbsolutePath: { regex: "/pages/aktuellt/" }) {
      frontmatter {
        title
        excerpt
      }
    }
    articles: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/aktuellt/" } }
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
                ...CardImage
              }
            }
          }
        }
      }
    }
  }
`
