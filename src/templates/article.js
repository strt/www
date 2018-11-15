import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import { H1, H4, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import renderAst from '../utils/renderAst'
import dayjs from '../utils/date'

export default function Template({ data: { markdownRemark: post } }) {
  const formattedDate = dayjs(post.frontmatter.date).format('D MMM YYYY')

  return (
    <Layout title={post.frontmatter.title}>
      <article>
        <Grid>
          <Column width="auto">
            <H4 as="time" dateTime={post.frontmatter.date}>
              {formattedDate}
            </H4>
          </Column>
        </Grid>
        <Hero pt={[2, 7]}>
          <H1>{post.frontmatter.title}</H1>
          <Excerpt>{post.frontmatter.excerpt}</Excerpt>
        </Hero>
        {post.frontmatter.image && (
          <Cover>
            <img src={post.frontmatter.image} alt="" />
          </Cover>
        )}
        <Section py="7">
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
        image
      }
    }
  }
`
