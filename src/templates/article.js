import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styled from 'styled-components'
import RehypeReact from 'rehype-react'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { Text, Excerpt, H1, H2 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h2: H2,
    p: Text,
  },
}).Compiler

const Img = styled.img`
  width: 100%;
  margin-bottom: 2.894vw;
`

export default function Template({
  data: { markdownRemark: post },
  pageContext: { next },
}) {
  return (
    <Layout title={post.frontmatter.title} hideFooter>
      <Grid>
        <Column>
          <Text as="time">{post.frontmatter.date}</Text>
          <H1>{post.frontmatter.title}</H1>
          <Excerpt>{post.frontmatter.excerpt}</Excerpt>
        </Column>
      </Grid>
      {post.frontmatter.image && <Img src={post.frontmatter.image} alt="" />}
      <Grid>
        <Column>
          {renderAst(post.htmlAst)}

          {next && (
            <>
              <Text>Nästa artikel</Text>
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
        image
      }
    }
  }
`
