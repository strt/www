import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Cover from '../components/Cover'
import Image from '../components/Image'
import ContentWrapper from '../components/ContentWrapper'
import { Grid, Column } from '../components/Grid'
import { H1, Excerpt } from '../components/Text'
import RichText from '../components/RichTextContentful'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function Standard({ data }) {
  const { title, excerpt, image, body, slug } = data.page

  const hasCover = !!image
  const theme = useContext(ThemeContext)
  if (theme.theme !== 'light') theme.toggleTheme('light')

  return (
    <Layout
      meta={getMetaFromPost(data.page)}
      mainMenu={data.mainmenu}
      footerMenu={data.footermenu}
    >
      <Hero pb={hasCover ? undefined : 0} keepContentMargin={!hasCover}>
        <H1>{title}</H1>
        {excerpt && <Excerpt>{excerpt.excerpt}</Excerpt>}
      </Hero>
      {hasCover && (
        <Cover>
          <Image fluid={image.childImageSharp.fluid} alt="" />
        </Cover>
      )}

      <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
        <ContentWrapper>
          <Grid>
            <Column md="10" lg="8">
              {slug === 'srs-model' && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: body.json.content[0].content[0].value,
                  }}
                />
              )}
              {slug !== 'srs-model' && <RichText document={body.json} />}
            </Column>
          </Grid>
        </ContentWrapper>
      </Section>
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
    mainmenu: contentfulMenus(
      identifier: { eq: "main" }
      node_locale: { eq: $locale }
    ) {
      identifier
      pages {
        name
        slug
        id
      }
    }
    footermenu: contentfulMenus(
      identifier: { eq: "footer" }
      node_locale: { eq: $locale }
    ) {
      identifier
      pages {
        name
        slug
        id
      }
    }
  }
`
