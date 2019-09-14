import React from 'react'
import { graphql } from 'gatsby'
import dayjs from 'dayjs'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Image from '../components/Image'
import Section from '../components/Section'
import { H1, H2, H4, Excerpt } from '../components/Text'
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

export default function Article({ data }) {
  const { createdAt, title, excerpt, body, featuredImage } = data.post
  const formattedDate = createdAt ? dayjs(createdAt).format('D MMM YYYY') : null
  const hasCover = !!featuredImage

  return (
    <Layout meta={getMetaFromPost()}>
      <article>
        {createdAt && (
          <Grid>
            <Column width="auto">
              <H4 as="time" dateTime={createdAt}>
                {formattedDate}
              </H4>
            </Column>
          </Grid>
        )}
        <Hero
          pt={[2, 7]}
          pb={hasCover ? undefined : 0}
          keepContentMargin={!hasCover}
        >
          <H1>{title}</H1>
          {excerpt && <Excerpt>{excerpt.excerpt}</Excerpt>}
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
        <Section as="aside" bg={colors.ice} mt={[10, 15]} pb={[5, 12]}>
          <Div halfTopBg="white" mb={[2, 4]}>
            <Grid>
              <Column>
                <H2>News</H2>
              </Column>
            </Grid>
          </Div>
          <Grid>
            {data.posts.edges.map(({ node }) => (
              <Column key={node.id} md="6" bottomGap>
                <Card
                  date={node.createdAt}
                  title={node.title}
                  url={node.slug}
                  image={node.featuredImage}
                />
              </Column>
            ))}
            <Column>
              <Div mt={[3, 2]}>
                <Link to={routes.news.link} variant="large">
                  More news
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
      createdAt
      featuredImage {
        fluid(quality: 80, maxWidth: 1300) {
          ...GatsbyContentfulFluid
        }
      }
      excerpt {
        excerpt
      }
      body {
        json
      }
    }
    posts: allContentfulPosts(
      limit: 4
      filter: { node_locale: { eq: $locale } }
    ) {
      edges {
        node {
          id
          slug
          title
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
