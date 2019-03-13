import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Image from '../components/Image'
import Section from '../components/Section'
import { H1, H4, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import ContentWrapper from '../components/ContentWrapper'
import Cover from '../components/Cover'
import dayjs from '../lib/dayjs'
import getMetaFromPost from '../lib/getMetaFromPost'

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
          <Excerpt>{excerpt}</Excerpt>
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
  }
`
