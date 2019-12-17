import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Cover from '../components/Cover'
import Image from '../components/Image'
import ContentWrapper from '../components/ContentWrapper'
import { Grid } from '../components/Grid'
import { Excerpt } from '../components/Text'
import RichText from '../components/RichTextContentful'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function About({ data }) {
  const { title, excerpt, image, body } = data.page
  const hasCover = !!image

  const theme = useContext(ThemeContext)
  if (theme.theme !== 'dark') theme.toggleTheme('dark')

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero md={8} pb={hasCover ? undefined : 0} keepContentMargin={!hasCover}>
        {title && (
          <Excerpt
            as="h1"
            textColor={theme.color}
            style={{ margin: '0', display: 'inline' }}
          >
            {title}&nbsp;
          </Excerpt>
        )}
        {excerpt && (
          <Excerpt textColor={theme.color} style={{ display: 'inline' }}>
            {excerpt.excerpt}
          </Excerpt>
        )}
      </Hero>
      {hasCover && (
        <Cover>
          <Image fluid={image.childImageSharp.fluid} alt="" />
        </Cover>
      )}
      {body && (
        <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
          <ContentWrapper>
            <Grid>
              <RichText document={body.json} />
            </Grid>
          </ContentWrapper>
        </Section>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    page: contentfulPages(slug: { eq: $slug }, node_locale: { eq: $locale }) {
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
