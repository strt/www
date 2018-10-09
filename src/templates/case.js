import React from 'react'
import { Link, graphql } from 'gatsby'
import RehypeReact from 'rehype-react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { Text, H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    p: Text,
  },
}).Compiler

export default function Template({ data }) {
  const { markdownRemark: post } = data
  console.log(post)
  const next = null

  return (
    <Layout title={post.title}>
      <Helmet title={post.frontmatter.title} />
      <Grid>
        <Column>
          {renderAst(post.htmlAst)}
          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.fields.title} →
              </Link>
            </li>
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
