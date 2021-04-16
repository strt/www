import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Cover from '../components/Cover'
import Image from '../components/Image'
import Link from '../components/Link'
import Section from '../components/Section'
import InstagramFeed from '../components/InstagramFeed'
import { H1, H2, H3, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { breakpoints, colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'
import { getActiveLangPath, isDefaultLanguage } from '../components/SelectLanguage'
import ContentWrapper from '../components/ContentWrapper'
import RichText from '../components/RichTextContentful'
import CardInfo from '../components/CardInfo'
// eslint-disable-next-line import/no-named-as-default

const CardImageBlock = styled.div`
  position: relative;
  width: 90%;
  
  .career-cover {
    padding-top: 100%;

    @media ${breakpoints.small} {
      padding-top: 70%;
    }

    @media ${breakpoints.medium} {
      padding-top: 46%;
    }
  }
`

const ManifestoImage = styled.div`
  margin-top: -5rem;

  @media ${breakpoints.small} {
    margin-top: -15rem;
  }

  @media ${breakpoints.medium} {
    margin-top: -16rem;
    margin-left: auto;
    margin-right: auto;
    max-width 70%;
  }
`

const CareerTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p, h2 {
    color: white;
  }
`

const ManifestTextWrapper = styled.div`
  .manifestHeadline {
    @media ${breakpoints.medium} {
      align-items: center;
    }
  }
`

const OurManifestText = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 4rem;
  }

  @media ${breakpoints.small} {
    h2 {
      font-size: 9rem;
    }
  }

  @media ${breakpoints.medium} {
    width: 66.66%;

    h2 {
      font-size: 11rem;
    }
  }

  @media ${breakpoints.large} {
    h2 {
      font-size: 13rem;
    }
  }

`

export default function Career({ data }) {
  const {
    contact,
    spontaneousTitle,
    spontaneousExcerpt,
    heroImage,
    page,
    secondHeader,
    manifestoHeader,
    manifesto,
    manifestoCollection
  } = data.contentfulPage

  const positions = data.allContentfulPositions.edges.filter(
    pos => pos.node.slug !== 'dummy',
  )
  const hasOpenPositions = positions.length > 0

  const theme = useContext(ThemeContext)
  if (theme.theme !== 'lightGray') theme.toggleTheme('lightGray')

  return (
    <Layout
      meta={getMetaFromPost(data.contentfulPage.page)}
      bg={theme.background}
    >
      <Hero pb={8} keepContentMargin>
        <H1 textColor={theme.color}>{page.title}</H1>
        <Excerpt textColor={theme.color}>{page.excerpt.excerpt}</Excerpt>
      </Hero>

      {hasOpenPositions && (
        <Section pb={8}>
          <Grid>
            <Column>
              <H2 textColor={theme.color} mb={[3, 4]}>
                {secondHeader}
              </H2>
              <ul>
                {positions.map(({ node }) => (
                  <li key={node.id}>
                    <H3 mb={[2, 3]} textColor={theme.linkColor}>
                      <Link
                        to={`${getActiveLangPath()}/join-us/${node.slug}`}
                        textColor={theme.linkColor}
                      >
                        {node.role}
                      </Link>
                    </H3>
                  </li>
                ))}
              </ul>
            </Column>
          </Grid>
        </Section>
      )}
      <Section pb={[15, 0]}>
        <CardImageBlock>
          <Cover className="career-cover">
            <Image fluid={heroImage.fluid} alt={heroImage.description} />
          </Cover>
          <CardInfo
            title={spontaneousExcerpt}
            text={spontaneousTitle}
            link={`mailto:${contact.email}`}
            linkText={contact.email}
            position="absolute"
          />
        </CardImageBlock>
      </Section>

      {manifesto && (
        <Section bg={colors.grey800}>
          <Grid mt={[20, 75]}>
            <Column>
              {manifestoCollection && (
                <ManifestoImage>
                  <Image src={manifestoCollection.fluid.src} alt={manifestoCollection.title} />
                </ManifestoImage>
              )}
            </Column>
          </Grid>
          <ContentWrapper>
            <ManifestTextWrapper>
              <Grid mt={[4, 8]} mb={[4, 8]}>
                <Column className="manifestHeadline">
                  <OurManifestText>
                    <H2 textColor={colors.grey700}>
                      {isDefaultLanguage() ? 'Vårt' : 'Our'}
                      <br />
                      {isDefaultLanguage() ? 'manifest' : 'manifesto'}
                    </H2>
                  </OurManifestText>
                </Column>
              </Grid>
              <Grid>
                <CareerTextWrapper>
                  <RichText document={manifesto.json} />
                </CareerTextWrapper>
              </Grid>
            </ManifestTextWrapper>
          </ContentWrapper>
        </Section>
      )}

      <Section bg={colors.dark}>
        <InstagramFeed halfTopBg={colors.grey800} />
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
      heroImage {
        fluid(quality: 80, maxWidth: 3000) {
          ...GatsbyContentfulFluid
        }
        description
      }
      spontaneousTitle
      spontaneousExcerpt
      secondHeader
      manifestoHeader {
        manifestoHeader
      }
      manifesto {
        json
      }
      manifestoCollection {
        contentful_id
        title
        fluid: fluid(quality: 100, maxWidth: 1060) {
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
