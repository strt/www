import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import { H2 } from '../components/Text'
import { Grid, CssGrid, Column } from '../components/Grid'
import Section from '../components/Section'
import Link from '../components/Link'
import Card from '../components/Card'
import Tile from '../components/Tile'
import Div from '../components/Div'
import Hero from '../components/Hero'
import FrontH1 from '../components/FrontH1'
import { getActiveLangPath } from '../components/SelectLanguage'
import { colors, breakpoints, vw } from '../style'
import { routes } from '../routes'
import getMetaFromPost from '../lib/getMetaFromPost'

const CaseGrid = styled(CssGrid)`
  @media ${breakpoints.medium} {
    grid-auto-flow: row dense;
  }

  > * {
    @media ${breakpoints.medium} {
      grid-row: span 2;
      grid-column: grid-start / span 6;
    }
  }

  > *:nth-child(1),
  > *:nth-child(4),
  > *:nth-child(5) {
    @media ${breakpoints.medium} {
      grid-row: span 5;
      min-height: ${vw(752)};
    }
  }

  > *:nth-child(2),
  > *:nth-child(4) {
    @media ${breakpoints.medium} {
      grid-column-start: col-end 6;
    }
  }

  > *:nth-child(5) {
    grid-column: grid;
  }
`

export default function Index({ data }) {
  const theme = useContext(ThemeContext)
  if (theme.dark) theme.toggleDark()

  const {
    page,
    featuredCases,
    casesLinkText,
    newsLinkText,
    newsHeader,
    hero,
  } = data.contentfulPage
  return (
    <Layout meta={getMetaFromPost(page)}>
      <Hero md={10} scrollButtonElement="#case-section" pt={8}>
        <FrontH1 heroContent={hero} />
      </Hero>
      <Section id="case-section" pt={[3, 4]} pb={[8, 16]}>
        <CaseGrid>
          {featuredCases.map((node, index) => (
            <Tile
              key={node.id}
              url={`${getActiveLangPath()}/work/${node.slug}`}
              title={node.client.name}
              image={node.featuredImage}
              video={
                index === featuredCases.length - 1 ? node.featuredVideo : ''
              }
              tags={node.tags}
              bg={node.color}
              mb="0"
              awards={node.awards}
            />
          ))}
        </CaseGrid>
        <Grid>
          <Column>
            <Div mt={[3, 6]}>
              <Link
                to={`${getActiveLangPath()}/${routes.work.link}`}
                colorVariant="dark"
                variant="large"
              >
                {casesLinkText}
              </Link>
            </Div>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.lightGray} pt="0" pb={[5, 10]}>
        <Div halfTopBg="white" mb={[2, 4]}>
          <Grid>
            <Column>
              <H2>{newsHeader}</H2>
            </Column>
          </Grid>
        </Div>
        <Grid>
          {data.posts.edges.map(({ node }) => (
            <Column key={node.id} md="6" bottomGap>
              <Card
                date={node.oldDate || node.createdAt}
                title={node.title}
                url={`${getActiveLangPath()}/news/${node.slug}`}
                image={node.featuredImage}
              />
            </Column>
          ))}
          <Column>
            <Div mt={[3, 2]}>
              <Link
                to={`${getActiveLangPath()}/${routes.news.link}`}
                variant="large"
              >
                {newsLinkText}
              </Link>
            </Div>
          </Column>
        </Grid>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulStartPage(
      page: { slug: { eq: $slug }, node_locale: { eq: $locale } }
    ) {
      casesLinkText
      newsLinkText
      newsHeader
      featuredCases {
        id
        title
        slug
        featuredImage {
          fluid(quality: 80) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        featuredVideo
        tags {
          name
        }
        client {
          name
        }
        awards {
          description
          title
          fluid: fluid(quality: 80, maxWidth: 500) {
            ...GatsbyContentfulFluid
          }
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
      hero: HeroText {
        text
        backgroundWordPosition
        colorWordPosition
        replaceWord
        replaceWordPosition
      }
    }
    posts: allContentfulPosts(
      limit: 4
      sort: { fields: [oldDate, createdAt], order: [DESC, DESC] }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          slug
          title
          oldDate
          createdAt
          featuredImage {
            fluid(quality: 80) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
