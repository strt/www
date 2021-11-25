import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import { Excerpt, H2 } from '../components/Text'
import { Grid, CssGrid, Column } from '../components/Grid'
import Section from '../components/Section'
import Link from '../components/Link'
import Card from '../components/Card'
import Tile from '../components/Tile'
import Div from '../components/Div'
import { StyledHero } from '../components/Hero'
import FrontH1 from '../components/FrontH1'
import {
  getActiveLangPath,
  getActiveLang,
  isDefaultLanguage,
} from '../components/SelectLanguage'
import { colors, breakpoints, vw } from '../style'
import { routes } from '../routes'
import getMetaFromPost from '../lib/getMetaFromPost'

const CaseGrid = styled(CssGrid)`
  @media ${breakpoints.small} {
    grid-auto-flow: row dense;
  }

  > * {
    @media ${breakpoints.small} {
      grid-row: span 2;
      grid-column: grid-start / span 6;
    }
  }

  > *:nth-child(1),
  > *:nth-child(4),
  > *:nth-child(5) {
    @media ${breakpoints.small} {
      grid-row: span 5;
      min-height: ${vw(752)};
    }
  }

  > *:nth-child(2),
  > *:nth-child(4) {
    @media ${breakpoints.small} {
      grid-column-start: col-end 6;
    }
  }

  > *:nth-child(5) {
    grid-column: grid;
  }
`

const CompanyOfTheYearBlock = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    &:hover {
      opacity: 1;
    }

    &:focus {
      outline: 1px dotted;
      background-color: transparent;
    }
  }
`

const CompanyOfTheYear = styled.img`
  max-height: 216px;
`

const NewsGrid = styled.div`
  .news-grid {
    @media ${breakpoints.smallDown} {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
`

export default function Index({ data }) {
  const theme = useContext(ThemeContext)
  if (theme.theme !== 'light') theme.toggleTheme('light')

  const {
    page,
    featuredCases,
    casesLinkText,
    newsLinkText,
    hero,
  } = data.contentfulPage

  return (
    <Layout meta={getMetaFromPost(page)}>
      <StyledHero pb={[2, 6]}>
        <Grid>
          <Column md={10} sm={10} smDown={12}>
            <FrontH1 heroContent={hero} />
          </Column>
          <Column md={2} sm={2} smDown={3}>
            <CompanyOfTheYearBlock>
              <Link
                to={`${getActiveLangPath()}/${
                  isDefaultLanguage() && routes.news.sv.link
                    ? routes.news.sv.link
                    : routes.news.link
                }/arets-byra-igen`}
              >
                <CompanyOfTheYear
                  src={
                    getActiveLang() === 'en'
                      ? '/Vinnarknapp_ÅB_Eng.png'
                      : '/Vinnarknapp_ÅB.png'
                  }
                  alt="Årets Byrå"
                />
              </Link>
            </CompanyOfTheYearBlock>
          </Column>
        </Grid>
      </StyledHero>
      <Section id="case-section" pt={[3, 4]} pb={[8, 10]}>
        <CaseGrid>
          {featuredCases.map((node, index) => (
            <Tile
              key={node.id}
              url={`${getActiveLangPath()}/${
                isDefaultLanguage() && routes.work.sv.link
                  ? routes.work.sv.link
                  : routes.work.link
              }/${node.slug}`}
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
            <Div mt={[0, 3]}>
              <Link
                to={`${getActiveLangPath()}/${
                  isDefaultLanguage() && routes.work.sv.link
                    ? routes.work.sv.link
                    : routes.work.link
                }`}
                textColor={theme.linkColor}
                styleVariant={theme.theme}
                variant="blue"
              >
                {casesLinkText}
              </Link>
            </Div>
          </Column>
        </Grid>
      </Section>
      <Section pt={[0, 5]} pb={[10, 25]}>
        <Grid>
          <Column>
            <Excerpt>{page.excerpt.excerpt}</Excerpt>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.lightGray} pt="0" pb={[5, 10]}>
        <Div halfTopBg={theme.background} mb={[2, 2]}>
          <Grid>
            <Column>
              <H2 textColor={theme.color}>
                {isDefaultLanguage() ? 'Aktuellt' : 'News'}
              </H2>
            </Column>
          </Grid>
        </Div>
        <NewsGrid>
          <Grid>
            {data.posts.edges.map(({ node }) => (
              <Column key={node.id} sm="6" bottomGap className="news-grid">
                <Card
                  date={node.oldDate || node.createdAt}
                  title={node.title}
                  url={`${getActiveLangPath()}/${
                    isDefaultLanguage() && routes.news.sv.link
                      ? routes.news.sv.link
                      : routes.news.link
                  }/${node.slug}`}
                  image={node.featuredImage}
                />
              </Column>
            ))}
            <Column>
              <Div mt={[3, 2]}>
                <Link
                  to={`${getActiveLangPath()}/${
                    isDefaultLanguage() && routes.news.sv.link
                      ? routes.news.sv.link
                      : routes.news.link
                  }`}
                  variant="blue"
                  textColor={theme.linkColor}
                  styleVariant={theme.theme}
                >
                  {newsLinkText}
                </Link>
              </Div>
            </Column>
          </Grid>
        </NewsGrid>
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
      featuredCases {
        id
        title
        slug
        featuredImage {
          fluid(quality: 80, maxWidth: 2000) {
            ...GatsbyContentfulFluid
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
          fluid: fluid(quality: 80, maxWidth: 800) {
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
            fluid(quality: 80, maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
