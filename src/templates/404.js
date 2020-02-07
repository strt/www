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
  if (theme.theme !== 'light') theme.toggleTheme('light')

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero>
        <H1 textColor={theme.color}>{page.title}</H1>
        <Excerpt textColor={theme.color}>{page.excerpt.excerpt}</Excerpt>
        <Link to="/" textColor={theme.color} variant="large">
          {linkText}
        </Link>
      </Hero>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulNotFoundPage(
      page: { slug: { eq: $slug }, node_locale: { eq: $locale } }
    ) {
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
