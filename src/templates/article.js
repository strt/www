import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import RehypeReact from 'rehype-react'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { Text, Excerpt, H1, H2 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h2: H2,
    p: Text,
  },
}).Compiler

export default function Template({
  data: { markdownRemark: post },
  pageContext: { next },
}) {
  return (
    <Layout title={post.frontmatter.title} hideFooter>
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
        <Grid>
          <Column tablet="8">
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
