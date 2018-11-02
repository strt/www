import React from 'react'
import { graphql } from 'gatsby'
import RehypeReact from 'rehype-react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Link from '../components/Link'
import { Text, Excerpt, H1, H2, H3, H6 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Icon from '../components/Icon'
import { colors } from '../style'

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
  const contact =
    post.frontmatter.contact && post.frontmatter.contact.frontmatter

  return (
    <Layout title={post.frontmatter.title} hideFooter>
      <Grid justifyContent="space-between">
        <Column width="auto">
          <Text>
            <b>{post.frontmatter.client}</b>
          </Text>
        </Column>
        <Column width="auto">
          <Text>
            —{' '}
            {post.frontmatter.tags.map((tag, index) => (
              <span key={tag}>
                <a href="/">{tag}</a>
                {index !== post.frontmatter.tags.length - 1 && ', '}
              </span>
            ))}
          </Text>
        </Column>
      </Grid>
      <Grid>
        <Column tablet="8">
          <H1>{post.frontmatter.title}</H1>
          <Excerpt>{post.frontmatter.excerpt}</Excerpt>
        </Column>
      </Grid>
      {post.frontmatter.image && (
        <Cover>
          <img src={post.frontmatter.image} alt="" />
        </Cover>
      )}
      <Section py={[2, 5]}>
        <Grid>
          <Column tablet="8">
            {renderAst(post.htmlAst)}

            {contact && (
              <>
                <H3>Vill du veta mer?</H3>
                <Text>
                  Kontakta {contact.contact_id}, {contact.role}. <br />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  <br />
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </Text>
              </>
            )}
          </Column>
        </Grid>
      </Section>
      {next && (
        <Section as="section" bg={colors.dark} py={[7, 7]}>
          <Grid>
            <Column>
              <H6 textColor="white" mb={[7, 7]}>
                Nästa case <Icon name={['fal', 'long-arrow-down']} />
              </H6>
              <H1 as={Link} to={next.fields.slug} rel="next" textColor="white">
                {next.frontmatter.client}
              </H1>
            </Column>
          </Grid>
        </Section>
      )}
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
        client
        excerpt
        tags
        image
        contact {
          frontmatter {
            contact_id
            role
            email
            phone
          }
        }
      }
    }
  }
`
