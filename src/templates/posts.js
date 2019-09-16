import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Section from '../components/Section'
import { H1, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { getActiveLangPath } from '../components/SelectLanguage'
import { colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function News({ data }) {
  const { title, excerpt } = data.contentfulPage
  return (
    <Layout meta={getMetaFromPost(data.contentfulPage.page)}>
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt.excerpt}</Excerpt>
      </Hero>
      <Section bg={colors.ice} pt={[5, 8]} pb={[10, 20]}>
        <Grid>
          {data.articles.edges.map(({ node }) => (
            <Column key={node.id} md="6" bottomGap>
              <Card
                date={node.createdAt}
                title={node.title}
                url={`${getActiveLangPath()}/${node.slug}`}
                image={node.featuredImage}
              />
            </Column>
          ))}
        </Grid>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulPages(
      slug: { eq: $slug }
      node_locale: { eq: $locale }
    ) {
      title
      excerpt {
        excerpt
      }
      ...Meta
    }
    articles: allContentfulPosts(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          slug
          title
          createdAt
          featuredImage {
            fluid(quality: 80) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
