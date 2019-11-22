import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Section from '../components/Section'
import { Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { getActiveLangPath } from '../components/SelectLanguage'
import { colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function News({ data }) {
  const { title } = data.contentfulPage

  const theme = useContext(ThemeContext)
  if (theme.dark) theme.toggleDark()

  return (
    <Layout meta={getMetaFromPost(data.contentfulPage)}>
      <Hero>
        <Excerpt as="h1">{title}</Excerpt>
      </Hero>
      <Section bg={colors.ice} pt={[5, 8]} pb={[10, 20]}>
        <Grid>
          {data.articles.edges.map(({ node }) => (
            <Column key={node.id} md="6" bottomGap>
              <Card
                date={node.oldDate || node.createdAt}
                title={node.title}
                url={`${getActiveLangPath()}/news/${node.slug}`}
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
      seoTitle
      seoDescription {
        seoDescription
      }
      seoImage {
        og: resize(width: 1200, height: 630, quality: 80) {
          src
        }
      }
    }
    articles: allContentfulPosts(
      sort: { fields: [oldDate, createdAt], order: [DESC, DESC] }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          slug
          title
          createdAt
          oldDate
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
