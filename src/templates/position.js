import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import { Grid, Column } from '../components/Grid'
import { H1, Excerpt } from '../components/Text'
import getMetaFromPost from '../lib/getMetaFromPost'
import RichText from '../components/RichTextContentful'
import ContentWrapper from '../components/ContentWrapper'

export default function Standard({ data }) {
  const { title, excerpt, image, body } = data.contentfulPosition
  const hasCover = !!image

  const theme = useContext(ThemeContext)
  if (theme.theme !== 'light') theme.toggleTheme('light')

  return (
    <Layout meta={getMetaFromPost()}>
      <Hero pb={hasCover ? undefined : 0} keepContentMargin={!hasCover}>
        <H1>{title}</H1>
        {excerpt && <Excerpt>{excerpt.excerpt}</Excerpt>}
      </Hero>
      <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
        <ContentWrapper>
          <Grid>
            <Column md="12" lg="10" xl="8">
              <RichText document={body.json} />
            </Column>
          </Grid>
        </ContentWrapper>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPosition: contentfulPositions(
      slug: { eq: $slug }
      node_locale: { eq: $locale }
    ) {
      id
      title
      slug
      excerpt {
        excerpt
      }
      body {
        json
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
  }
`
