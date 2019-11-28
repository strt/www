import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Link from '../components/Link'
import Section from '../components/Section'
import InstagramFeed from '../components/InstagramFeed'
import { H1, H4, Excerpt, Text } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { breakpoints, colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'
import { getActiveLangPath } from '../components/SelectLanguage'

const LargeText = styled(Excerpt)`
  @media ${breakpoints.medium} {
    max-width: 100%;
  }
`

export default function Career({ data }) {
  const { contact, spontaneousTitle, page, secondHeader } = data.contentfulPage
  const hasOpenPositions = !!data.allContentfulPositions.edges.length

  const theme = useContext(ThemeContext)
  if (!theme.dark) theme.toggleDark()

  return (
    <Layout meta={getMetaFromPost(data.contentfulPage.page)}>
      <Hero pb={0} keepContentMargin>
        <H1 textColor={colors.light}>{page.title}</H1>
      </Hero>
      {hasOpenPositions && (
        <Section bg={colors.dark} py={[5, 7]}>
          <Grid>
            <Column>
              <Text as="h2" textColor={colors.light} mb={[3, 4]}>
                {secondHeader}
              </Text>
              <ul>
                {data.allContentfulPositions.edges.map(({ node }) => (
                  <li key={node.id}>
                    <Text mb={[2, 3]} textColor={colors.light}>
                      <Link
                        to={`${getActiveLangPath()}/join-us/${node.slug}`}
                        colorVariant="light"
                        styleVariant="light"
                      >
                        {node.role}
                      </Link>
                    </Text>
                  </li>
                ))}
              </ul>
            </Column>
          </Grid>
        </Section>
      )}

      <Section>
        <Grid>
          <Column>
            <H4 as="h2" textColor={colors.light}>
              {spontaneousTitle}
            </H4>
            <Text>
              <Link
                colorVariant="light"
                styleVariant="light"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </Link>
            </Text>
          </Column>
        </Grid>
      </Section>

      {page.excerpt && (
        <Section>
          <Grid>
            <Column>
              <LargeText textColor={colors.light}>
                {page.excerpt.excerpt}
              </LargeText>
            </Column>
          </Grid>
        </Section>
      )}
      <Section bg={colors.dark} pt="0">
        <InstagramFeed />
      </Section>
    </Layout>
  )
}

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
