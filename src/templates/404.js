import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { H1, Excerpt } from '../components/Text'
import Link from '../components/Link'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function NotFound({ data }) {
  const { page, linkText } = data.contentfulPage

  const theme = useContext(ThemeContext)
  if (theme.dark) theme.toggleDark()

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero>
        <H1>{page.title}</H1>
        <Excerpt>{page.excerpt.excerpt}</Excerpt>
        <Link to="/" colorVariant="dark" variant="large">
          {linkText}
        </Link>
      </Hero>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulPage: contentfulNotFoundPage(page: { slug: { eq: $slug } }) {
      page {
        title
        slug
        excerpt {
          excerpt
        }
      }
      linkText
    }
  }
`
