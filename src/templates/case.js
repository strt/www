import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import RehypeReact from 'rehype-react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { Text, Excerpt, H1, H2 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    h2: H2,
    p: Text,
  },
}).Compiler

export default function Template({
  data: { markdownRemark: post },
  pageContext: { next },
}) {
  return (
    <Layout title={post.title}>
      <Helmet title={post.frontmatter.title} />
      <Grid>
        <Column>
          <H1>{post.frontmatter.title}</H1>
          <Excerpt>{post.frontmatter.excerpt}</Excerpt>
          {renderAst(post.htmlAst)}
          {next && (
            <>
              <Text>Nästa case</Text>
              <Link as={GatsbyLink} to={next.fields.slug} rel="next">
                → {next.frontmatter.title}
              </Link>
            </>
          )}
        </Column>
      </Grid>
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
        tags
        image
      }
    }
  }
`
