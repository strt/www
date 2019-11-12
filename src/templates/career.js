import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Link from '../components/Link'
import Section from '../components/Section'
import InstagramFeed from '../components/InstagramFeed'
import { H1, H2, H3, Excerpt, Text } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'
import { getActiveLangPath } from '../components/SelectLanguage'

export default function Career({ data }) {
  const { contact, spontaneousTitle, page, secondHeader } = data.contentfulPage
  const hasOpenPositions = !!data.allContentfulPositions.edges.length

  return (
    <Layout meta={getMetaFromPost(data.contentfulPage.page)}>
      <Hero pb={0} keepContentMargin>
        <H1>{page.title}</H1>
        {page.excerpt && <Excerpt>{page.excerpt.excerpt}</Excerpt>}
      </Hero>
      {hasOpenPositions && (
        <Section bg={colors.dark} py={[5, 7]}>
          <Grid>
            <Column>
              <H2 textColor="white" mb={[3, 4]}>
                {secondHeader}
              </H2>
              <ul>
                {data.allContentfulPositions.edges.map(({ node }) => (
                  <li key={node.id}>
                    <Excerpt mb={[2, 3]}>
                      <Link
                        to={`${getActiveLangPath()}/join-us/${node.slug}`}
                        colorVariant="white"
                      >
                        {node.role}
                      </Link>
                    </Excerpt>
                  </li>
                ))}
              </ul>
            </Column>
          </Grid>
        </Section>
      )}
      <Section pt={hasOpenPositions ? [5, 7] : 0}>
        <Grid>
          <Column>
            <H3>{spontaneousTitle}</H3>
            <Text>
              <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
            </Text>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.dark} pt="0" mt={[8, 24]} pb={[12, 36]}>
        <InstagramFeed />
      </Section>
    </Layout>
  )
}
// Todo add meta

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulCareerPage(
      page: { slug: { eq: $slug }, node_locale: { eq: $locale } }
    ) {
      contact {
        email
      }
      spontaneousTitle
      secondHeader
      page {
        title
        slug
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
    }

    allContentfulPositions(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          role
          slug
        }
      }
    }
  }
`
