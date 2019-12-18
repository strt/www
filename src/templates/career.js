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
import { vw, breakpoints } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'
import { getActiveLangPath } from '../components/SelectLanguage'
import ContentWrapper from '../components/ContentWrapper'
import RichText from '../components/RichTextContentful'
import Image from '../components/Image'
// eslint-disable-next-line import/no-named-as-default
import ImageLogo from '../components/ImageLogo'

const LargeText = styled(Excerpt)`
  @media ${breakpoints.medium} {
    max-width: 100%;
  }
`

const ManifestoImageWrapper = styled.div`
  position: relative;

  @media ${breakpoints.medium} {
    min-height: 450px;
  }
  @media ${breakpoints.large} {
    min-height: 650px;
  }
`

const ManifestoImage = styled.div`
  position: relative;
  max-width: 25%;
  padding: 10px;
  display: inline-block;

  @media ${breakpoints.medium} {
    position: absolute;
    max-width: 200px;
  }

  @media ${breakpoints.large} {
    max-width: 300px;
  }

  &:nth-of-type(1) {
    @media ${breakpoints.medium} {
      top: -125px;
      right: 0;
    }
  }

  &:nth-of-type(2) {
    @media ${breakpoints.medium} {
      top: 200px;
      right: 0;
    }
    @media ${breakpoints.large} {
      top: 300px;
    }
  }

  &:nth-of-type(3) {
    @media ${breakpoints.medium} {
      top: 30px;
      right: 220px;
    }
    @media ${breakpoints.large} {
      top: 100px;
      right: 320px;
    }
  }

  &:nth-of-type(4) {
    @media ${breakpoints.medium} {
      top: 200px;
      right: 440px;
    }
    @media ${breakpoints.large} {
      top: 300px;
      right: 640px;
    }
  }
`

const ImageLogoItem = styled.div`
  position: absolute;
  right: 0;
  width: 20%;
  margin-right: 25px;
  margin-top: 20%;

  @media ${breakpoints.small} {
    padding-right: 15px;
    margin-right: ${vw(40)};
  }

  @media ${breakpoints.medium} {
    width: 30%;
    margin-top: 10%;
  }

  @media ${breakpoints.large} {
    margin-top: 0;
  }
`

export default function Career({ data }) {
  const {
    contact,
    spontaneousTitle,
    page,
    secondHeader,
    manifestoHeader,
    manifesto,
    manifestoImages,
  } = data.contentfulPage
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

      <Section>
        <ImageLogoItem>
          <ImageLogo />
        </ImageLogoItem>

        {page.excerpt && (
          <Grid>
            <Column>
              <LargeText textColor={theme.color}>
                {page.excerpt.excerpt}
              </LargeText>
            </Column>
          </Grid>
        )}
      </Section>

      {hasOpenPositions && (
        <Section>
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

      {hasOpenPositions && (
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
      )}

      {manifesto && (
        <Section>
          <Grid pt={20}>
            <Column>
              <H1
                as="h2"
                textColor={theme.color}
                dangerouslySetInnerHTML={{
                  __html: manifestoHeader.manifestoHeader.replace(
                    /\n/g,
                    '<br/>',
                  ),
                }}
              />
              {manifestoImages && (
                <ManifestoImageWrapper>
                  {manifestoImages.map(item => (
                    <ManifestoImage key={`badge${item.contentful_id}`}>
                      <Image src={item.fixed.src} alt={item.title} />
                    </ManifestoImage>
                  ))}
                </ManifestoImageWrapper>
              )}
            </Column>
          </Grid>
          <ContentWrapper>
            <Grid>
              <RichText document={manifesto.json} />
            </Grid>
          </ContentWrapper>
        </Section>
      )}

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
      manifestoHeader {
        manifestoHeader
      }
      manifesto {
        json
      }
      manifestoImages {
        contentful_id
        title
        fixed: resize(width: 300, height: 300, quality: 80) {
          src
        }
      }
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
