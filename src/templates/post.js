import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
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
import getMetaFromPost from '../lib/getMetaFromPost'
import { colors } from '../style'
import { routes } from '../routes'

export default function Article({ data }) {
  const { date, title, excerpt, image } = data.post.frontmatter
  const formattedDate = date ? dayjs(date).format('D MMM YYYY') : null
  const hasCover = !!data.post.frontmatter.image

  return (
    <Layout meta={getMetaFromPost(data.post, { type: 'article' })}>
      <article>
        {date && (
          <Grid>
            <Column width="auto">
              <H4 as="time" dateTime={date}>
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
          {excerpt && <Excerpt>{excerpt}</Excerpt>}
        </Hero>
        {hasCover && (
          <Cover>
            <Image fluid={image.childImageSharp.fluid} alt="" />
          </Cover>
        )}
        <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
          <ContentWrapper>
            <Grid>
              <MDXRenderer>{data.post.code.body}</MDXRenderer>
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
                  date={node.frontmatter.date}
                  title={node.frontmatter.title}
                  url={node.fields.slug}
                  image={node.frontmatter.image}
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
  query($slug: String!) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      fields {
        slug
      }
      frontmatter {
        date
        title
        excerpt
        image {
          childImageSharp {
            ...CoverImage
            og: resize(width: 1200, height: 630, quality: 80) {
              src
            }
          }
        }
      }
    }
    posts: allMdx(
      limit: 4
      filter: {
        fields: { template: { eq: "post" }, slug: { ne: $slug } }
        frontmatter: { published: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            image {
              childImageSharp {
                ...CardImage
              }
            }
          }
        }
      }
    }
  }
`
