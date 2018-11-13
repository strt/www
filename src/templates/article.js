import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Text, Excerpt, H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import renderAst from '../utils/renderAst'

export default function Template({ data: { markdownRemark: post } }) {
  return (
    <Layout title={post.frontmatter.title}>
      <article>
        <Grid>
          <Column tablet="8">
            <Text as="time">{post.frontmatter.date}</Text>
            <H1>{post.frontmatter.title}</H1>
            <Excerpt>{post.frontmatter.excerpt}</Excerpt>
          </Column>
        </Grid>
        {post.frontmatter.image && (
          <Cover>
            <img src={post.frontmatter.image} alt="" />
          </Cover>
        )}
        <Grid>{renderAst(post.htmlAst)}</Grid>
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
