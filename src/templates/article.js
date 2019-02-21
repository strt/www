import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Image from '../components/Image'
import Section from '../components/Section'
import { H1, H4, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import renderAst from '../lib/renderAst'
import dayjs from '../lib/dayjs'

export default function Template({ data: { markdownRemark: post } }) {
  const { date } = post.frontmatter
  const formattedDate = date ? dayjs(date).format('D MMM YYYY') : null
  const hasCover = !!post.frontmatter.image

  return (
    <Layout title={post.frontmatter.title}>
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
          <H1>{post.frontmatter.title}</H1>
          <Excerpt>{post.frontmatter.excerpt}</Excerpt>
        </Hero>
        {hasCover && (
          <Cover>
            <Image
              fluid={post.frontmatter.image.childImageSharp.fluid}
              alt=""
            />
          </Cover>
        )}
        <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
          <Grid>{renderAst(post.htmlAst)}</Grid>
        </Section>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        date
        title
        excerpt
        image {
          childImageSharp {
            ...CoverImage
          }
        }
      }
    }
  }
`
