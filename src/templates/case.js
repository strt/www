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
import { formatPhone } from '../lib/format'

export default function Case({ data: { post }, pageContext: { next } }) {
  const {
    title,
    excerpt,
    tags,
    client,
    image,
    video,
    contact_relation: contactRelation,
  } = post.frontmatter
  const contact = contactRelation && contactRelation.frontmatter

  return (
    <Layout meta={getMetaFromPost(post)} hideFooter>
      <article>
        <Grid
          justifyContent="space-between"
          alignItems={['flex-start', 'center']}
          flexWrap="nowrap"
        >
          <Column width="auto">
            <H4 mb="0">{client}</H4>
          </Column>
          <Column width="auto">
            <Tags items={tags} colorVariant="gray" />
          </Column>
        </Grid>
        <Hero pt={[2, 7]} pb={[5, 7]}>
          <H1>{title}</H1>
          {excerpt && <Excerpt>{excerpt}</Excerpt>}
        </Hero>
        {(image || video) && (
          <Cover bg={colors.dark} isVideo={!!video}>
            {image && !video && (
              <Image fluid={image.childImageSharp.fluid} alt="" />
            )}
            {video && <EmbedPlayer src={video} bg="transparent" />}
          </Cover>
        )}
        <Section pt={[5, 7]} pb={[10, 13]}>
          <ContentWrapper>
            <Grid>
              <MDXRenderer>{post.code.body}</MDXRenderer>
            </Grid>
          </ContentWrapper>

          <Grid>
            {contact && (
              <Column md="8" mt={[4, 6]}>
                <H3>Would you like to know more?</H3>
                <Text>
                  Contact {contact.first_name} {contact.last_name},{' '}
                  {contact.role} <br />
                  <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                  <br />
                  <Link href={`tel:${formatPhone(contact.phone)}`}>
                    {contact.phone}
                  </Link>
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
                  Next case <Icon name={['fal', 'long-arrow-down']} />
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
