import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { H1, Excerpt } from '../components/Text'
import Link from '../components/Link'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function NotFound({ data }) {
  const { title, excerpt } = data.page.frontmatter
  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt}</Excerpt>
        <Link to="/" colorVariant="dark" variant="large">
          Go to start page
        </Link>
      </Hero>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        excerpt
        seo {
          title
          description
          image {
            childImageSharp {
              og: resize(width: 1200, height: 630, quality: 90) {
                src
              }
            }
          }
        }
      }
    }
  }
`
