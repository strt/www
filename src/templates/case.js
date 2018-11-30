import React from 'react'
import { graphql, Link as GatsbyLink } from 'gatsby'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Hero from '../components/Hero'
import { Text, Excerpt, H1, H3, H4, H6 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Icon from '../components/Icon'
import Image from '../components/Image'
import { ScrollToTopButton } from '../components/Button'
import Tags from '../components/Tags'
import { colors } from '../style'
import renderAst from '../utils/renderAst'

export default function Template({
  data: { markdownRemark: post },
  pageContext: { next },
}) {
  const contact =
    post.frontmatter.contact_relation &&
    post.frontmatter.contact_relation.frontmatter

  return (
    <Layout title={post.frontmatter.title} hideFooter>
      <article>
        <Grid
          justifyContent="space-between"
          alignItems={['flex-start', 'center']}
          flexWrap="nowrap"
        >
          <Column width="auto">
            <H4 mb="0">{post.frontmatter.client}</H4>
          </Column>
          <Column width="auto">
            <Tags items={post.frontmatter.tags} />
          </Column>
        </Grid>
        <Hero pt={[2, 7]} pb={[5, 7]}>
          <H1>{post.frontmatter.title}</H1>
          <Excerpt>{post.frontmatter.excerpt}</Excerpt>
        </Hero>
        {post.frontmatter.image && (
          <Cover>
            <Image
              fluid={post.frontmatter.image.childImageSharp.fluid}
              alt=""
            />
          </Cover>
        )}
        <Section py={[5, 7]}>
          <Grid>
            {renderAst(post.htmlAst)}

            {contact && (
              <Column tablet="8" mt={[3, 5]}>
                <H3>Vill du veta mer?</H3>
                <Text>
                  Kontakta {contact.first_name} {contact.last_name},{' '}
                  {contact.role}. <br />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  <br />
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </Text>
              </Column>
            )}
          </Grid>
        </Section>
        {next && (
          <Section as="footer" bg={colors.dark} py={[7, 7]}>
            <Grid>
              <Column>
                <H6 textColor="white" mb={[3, 7]}>
                  Nästa case <Icon name={['fal', 'long-arrow-down']} />
                </H6>
                <H1
                  as={GatsbyLink}
                  to={next.fields.slug}
                  rel="next"
                  textColor="white"
                >
                  {next.frontmatter.client}
                </H1>
              </Column>
            </Grid>
            <Grid justifyContent="flex-end" mt={[7, 4]}>
              <Column width="auto">
                <ScrollToTopButton textColor="white" />
              </Column>
            </Grid>
          </Section>
        )}
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
        client
        excerpt
        tags
        image {
          childImageSharp {
            ...HeroImage
          }
        }
        contact_relation {
          frontmatter {
            first_name
            last_name
            role
            email
            phone
          }
        }
      }
    }
  }
`
