import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Image from '../components/Image'
import Section from '../components/Section'
import { H1, H2, Excerpt, TextSmall } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import ContentWrapper from '../components/ContentWrapper'
import Cover from '../components/Cover'
import Div from '../components/Div'
import Link from '../components/Link'
import Card from '../components/Card'
import RichText from '../components/RichTextContentful'
import getMetaFromPost from '../lib/getMetaFromPost'
import { colors } from '../style'
import { routes } from '../routes'
import {
  getActiveLangPath,
  isDefaultLanguage,
} from '../components/SelectLanguage'

export default function Article({ data }) {
  const { createdAt, oldDate, title, excerpt, body, featuredImage } = data.post
  const formattedDate = oldDate
    ? dayjs(oldDate).format('D MMM YYYY')
    : dayjs(createdAt).format('D MMM YYYY')
  const hasCover = !!featuredImage

  const theme = useContext(ThemeContext)
  if (theme.theme !== 'light') theme.toggleTheme('light')

  const DateBlock = styled.div`
    padding-left: 0.75rem;
    border-left: 2px solid ${colors.grey300};
  `

  return (
    <Layout meta={getMetaFromPost(data.post)}>
      <article>
        {(createdAt || oldDate) && (
          <Grid>
            <Column width="auto">
              <DateBlock>
                <TextSmall as="time" dateTime={oldDate || createdAt}>
                  {formattedDate}
                </TextSmall>
              </DateBlock>
            </Column>
          </Grid>
        )}
        <Hero
          pt={[2, 7]}
          pb={hasCover ? undefined : 0}
          keepContentMargin={!hasCover}
        >
          <H1 textColor={theme.color}>{title}</H1>
          {excerpt && (
            <Excerpt textColor={theme.color}>{excerpt.excerpt}</Excerpt>
          )}
        </Hero>
        {hasCover && (
          <Cover>
            <Image fluid={featuredImage.fluid} alt="" />
          </Cover>
        )}
        <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
          <ContentWrapper>
            <Grid>
              <RichText document={body.json} />
            </Grid>
          </ContentWrapper>
        </Section>
        <Section as="aside" bg={colors.lightGray} mt={[10, 15]} pb={[5, 12]}>
          <Div halfTopBg={theme.background} mb={[2, 4]}>
            <Grid>
              <Column>
                <H2 textColor={theme.color}>
                  {isDefaultLanguage() ? 'Aktuellt' : 'News'}
                </H2>
              </Column>
            </Grid>
          </Div>
          <Grid>
            {data.posts.edges.map(({ node }) => (
              <Column key={node.id} md="6" bottomGap>
                <Card
                  date={node.createdAt}
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
                >
                  {isDefaultLanguage() ? 'Fler nyheter' : 'More news'}
                </Link>
              </Div>
            </Column>
          </Grid>
        </Section>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    post: contentfulPosts(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      title
      slug
      oldDate
      createdAt
      featuredImage {
        fluid(quality: 80, maxWidth: 3000) {
          ...GatsbyContentfulFluid
        }
        fixed {
          src
        }
      }
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
    posts: allContentfulPosts(
      limit: 4
      filter: { slug: { ne: $slug }, node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          slug
          title
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
