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
import { getActiveLangPath } from '../components/SelectLanguage'
import ContentWrapper from '../components/ContentWrapper'
import RichText from '../components/RichTextContentful'
import CardInfo from '../components/CardInfo'
// eslint-disable-next-line import/no-named-as-default
import joinImage from '../assets/join.png'

const CardImageBlock = styled.div`
  position: relative;

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
    max-width: 360px;
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

const CareerText = styled.div`
  p {
    color: white;
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
      <Section>
        <CardImageBlock>
          <Cover className="career-cover">
            <img src={joinImage} alt="" />
          </Cover>
          <CardInfo
            title="Vi letar alltid efter nya talanger."
            text={spontaneousTitle}
            link={`mailto:${contact.email}`}
            linkText={contact.email}
            position="absolute"
          />
        </CardImageBlock>
      </Section>

      {manifesto && (
        <Section bg={colors.grey800}>
          <Grid mt={70}>
            <Column>
              {/* <H1
                as="h2"
                textColor={theme.color}
                dangerouslySetInnerHTML={{
                  __html: manifestoHeader.manifestoHeader.replace(
                    /\n/g,
                    '<br/>',
                  ),
                }}
              /> */}
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
              <CareerText>
                <RichText document={manifesto.json} />
              </CareerText>
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
