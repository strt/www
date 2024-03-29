import React, { useContext, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Section from '../components/Section'
import { Excerpt, H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import {
  getActiveLangPath,
  isDefaultLanguage,
} from '../components/SelectLanguage'
import { colors, breakpoints } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'
import { routes } from '../routes'

export default function News({ data }) {
  const [limit, setLimit] = useState(8)

  const { name, excerpt } = data.contentfulPage

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      setLimit(prevLimit => prevLimit + 8)
    }
  }

  const LoadMoreDiv = styled.div`
    display: inline-block;
    cursor: pointer;
    color: ${colors.linkDark};
    font-size: 1.125rem;

    &:hover,
    &:focus {
      text-decoration: underline;
      opacity: 0.85;
    }

    &:focus-visible {
      outline: none;
      text-decoration: none;
      background-color: ${colors.orange300};
    }

    &:active,
    &[aria-current],
    &[data-partially-current] {
      text-decoration: none;
    }

    @media ${breakpoints.medium} {
      font-size: 1.5rem;
    }
  `

  const NewsGrid = styled.div`
    .news-grid {
      @media ${breakpoints.smallDown} {
        margin-top: 8px;
        margin-bottom: 8px;
      }
    }
  `

  const theme = useContext(ThemeContext)
  if (theme.theme !== 'gray') theme.toggleTheme('gray')

  return (
    <Layout
      meta={getMetaFromPost(data.contentfulPage)}
      mainMenu={data.mainmenu}
      footerMenu={data.footermenu}
    >
      <Hero>
        <H1 textColor={theme.color}>{name}</H1>
        {excerpt && (
          <Excerpt textColor={theme.color}>{excerpt.excerpt}</Excerpt>
        )}
      </Hero>
      <Section pt={[1, 1]} pb={[2, 2]}>
        <NewsGrid>
          <Grid>
            {data.articles.edges.slice(0, limit).map(({ node }) => (
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
          </Grid>
        </NewsGrid>
      </Section>
      <Section pb={10}>
        <Grid>
          <Column pb={1}>
            <LoadMoreDiv
              style={{
                display: limit >= data.articles.edges.length ? 'none' : '',
              }}
              onClick={() => {
                setLimit(prevLimit => prevLimit + 8)
              }}
              onKeyUp={handleKeyUp}
              textColor={theme.linkColor}
              tabIndex="0"
            >
              Visa fler
            </LoadMoreDiv>
          </Column>
        </Grid>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulPages(
      slug: { eq: $slug }
      node_locale: { eq: $locale }
    ) {
      title
      name
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
    articles: allContentfulPosts(
      sort: { fields: [oldDate, createdAt], order: [DESC, DESC] }
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          slug
          title
          createdAt
          oldDate
          featuredImage {
            fluid(quality: 80, maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
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
