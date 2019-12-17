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
import { breakpoints } from '../style'
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
  if (theme.theme !== 'purple') theme.toggleTheme('purple')

  return (
    <Layout
      meta={getMetaFromPost(data.contentfulPage.page)}
      bg={theme.background}
    >
      <Hero pb={0} keepContentMargin>
        <H1 textColor={theme.color}>{page.title}</H1>
      </Hero>
      {page.excerpt && (
        <Section>
          <Grid>
            <Column>
              <LargeText textColor={theme.color}>
                {page.excerpt.excerpt}
              </LargeText>
            </Column>
          </Grid>
        </Section>
      )}
      {hasOpenPositions && (
        <Section py={[5, 7]}>
          <Grid>
            <Column>
              <H4 as="h2" textColor={theme.color} mb={[3, 4]}>
                {secondHeader}
              </H4>
              <ul>
                {data.allContentfulPositions.edges.map(({ node }) => (
                  <li key={node.id}>
                    <Text mb={[2, 3]} textColor={theme.color}>
                      <Link
                        to={`${getActiveLangPath()}/join-us/${node.slug}`}
                        textColor={theme.color}
                        styleVariant={theme.theme}
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
            <H4 as="h2" textColor={theme.color}>
              {spontaneousTitle}
            </H4>
            <Text>
              <Link
                textColor={theme.color}
                styleVariant={theme.theme}
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </Link>
            </Text>
          </Column>
        </Grid>
      </Section>
      <Section bg={theme.background} pt="0">
        <InstagramFeed halfTopBg={theme.background} />
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
