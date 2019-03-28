import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Cover from '../components/Cover'
import Image from '../components/Image'
import { Grid } from '../components/Grid'
import { H1, Excerpt } from '../components/Text'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function Standard({ data }) {
  const { title, excerpt, image } = data.page.frontmatter
  const hasCover = !!image

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero pb={hasCover ? undefined : 0} keepContentMargin={!hasCover}>
        <H1>{title}</H1>
        <Excerpt>{excerpt}</Excerpt>
      </Hero>
      {hasCover && (
        <Cover>
          <Image fluid={image.childImageSharp.fluid} alt="" />
        </Cover>
      )}
      <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
        <Grid>
          <MDXRenderer>{data.page.code.body}</MDXRenderer>
        </Grid>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        excerpt
        seo {
          title
          description
          image {
            childImageSharp {
              og: resize(width: 1200, height: 630, quality: 80) {
                src
              }
            }
          }
        }
      }
      code {
        body
      }
    }
  }
`
