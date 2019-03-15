import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Hero from '../components/Hero'
import Link from '../components/Link'
import { Text, Excerpt, H1, H3, H4, H6 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Icon from '../components/Icon'
import Image from '../components/Image'
import EmbedPlayer from '../components/EmbedPlayer'
import { ScrollToTopButton } from '../components/Button'
import Tags from '../components/Tags'
import ContentWrapper from '../components/ContentWrapper'
import { colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function Case({ data: { post }, pageContext: { next } }) {
  const contact =
    post.frontmatter.contact_relation &&
    post.frontmatter.contact_relation.frontmatter

  return (
    <Layout meta={getMetaFromPost(post)} hideFooter>
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
            <Tags items={post.frontmatter.tags} colorVariant="gray" />
          </Column>
        </Grid>
        <Hero pt={[2, 7]} pb={[5, 7]}>
          <H1>{post.frontmatter.title}</H1>
          <Excerpt>{post.frontmatter.excerpt}</Excerpt>
        </Hero>
        {(post.frontmatter.image || post.frontmatter.video) && (
          <Cover bg={post.frontmatter.color} isVideo={!!post.frontmatter.video}>
            {post.frontmatter.image && !post.frontmatter.video && (
              <Image
                fluid={post.frontmatter.image.childImageSharp.fluid}
                alt=""
              />
            )}
            {post.frontmatter.video && (
              <EmbedPlayer src={post.frontmatter.video} bg="transparent" />
            )}
          </Cover>
        )}
        <Section py={[5, 7]}>
          <ContentWrapper>
            <Grid>
              <MDXRenderer>{post.code.body}</MDXRenderer>
            </Grid>
          </ContentWrapper>

          <Grid>
            {contact && (
              <Column md="8" mt={[3, 5]}>
                <H3>Vill du veta mer?</H3>
                <Text>
                  Kontakta {contact.first_name} {contact.last_name},{' '}
                  {contact.role}. <br />
                  <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                  <br />
                  <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
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
                <H1 as="div">
                  <Link
                    as={Link}
                    to={next.fields.slug}
                    rel="next"
                    colorVariant="white"
                  >
                    {next.frontmatter.client}
                  </Link>
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
    post: mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      fields {
        slug
      }
      frontmatter {
        date
        title
        client
        excerpt
        tags
        color
        video
        image {
          childImageSharp {
            ...CoverImage
            og: resize(width: 1200, height: 630, quality: 80) {
              src
            }
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
