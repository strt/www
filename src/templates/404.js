import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { H1, Excerpt } from '../components/Text'
import Link from '../components/Link'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function NotFound({ data }) {
  const { title, excerpt } = data.contentfulPages

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt.excerpt}</Excerpt>
        <Link to="/" colorVariant="dark" variant="large">
          Go to start page
        </Link>
      </Hero>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulPages(slug: { eq: $slug }) {
      title
      slug
      excerpt {
        excerpt
      }
    }
  }
`
