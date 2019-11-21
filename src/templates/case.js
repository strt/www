import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
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
import RichText from '../components/RichTextContentful'
import { formatPhone } from '../lib/format'
import Awards from '../components/Awards'

export default function Case({ data, pageContext: { next } }) {
  const {
    title,
    excerpt,
    tags,
    client,
    contact,
    featuredVideo,
    featuredImage,
    body,
    awards,
  } = data.contentfulCase

  const theme = useContext(ThemeContext)
  if (theme.dark) theme.toggleDark()

  return (
    <Layout meta={getMetaFromPost()} hideFooter>
      <article>
        <Grid
          justifyContent="space-between"
          alignItems={['flex-start', 'center']}
          flexWrap="nowrap"
        >
          <Column width="auto">
            <H4 mb="0">{client.name}</H4>
          </Column>
          <Column width="auto">
            <Tags items={tags} colorVariant="gray" />
          </Column>
        </Grid>
        <Hero pt={[2, 7]} pb={[5, 7]}>
          <H1>{title}</H1>
          {excerpt && <Excerpt>{excerpt.excerpt}</Excerpt>}
        </Hero>
        {(featuredImage || featuredVideo) && (
          <Cover bg={colors.dark} isVideo={!!featuredVideo}>
            {featuredImage && !featuredVideo && (
              <Image fluid={featuredImage.fluid} alt="" />
            )}
            {featuredVideo && (
              <EmbedPlayer src={featuredVideo} bg="transparent" />
            )}
            {awards && <Awards items={awards} />}
          </Cover>
        )}
        <Section pt={[5, 7]} pb={[10, 13]}>
          <ContentWrapper>
            <Grid>
              <RichText document={body.json} />
            </Grid>
          </ContentWrapper>

          <Grid>
            {contact && (
              <Column md="8" mt={[4, 6]}>
                <H3>Would you like to know more?</H3>
                <Text>
                  Contact {contact.firstName} {contact.lastName},{' '}
                  {contact.title}
                  <br />
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
  query($slug: String!, $locale: String!) {
    contentfulCase: contentfulCases(
      slug: { eq: $slug }
      node_locale: { eq: $locale }
    ) {
      id
      title
      slug
      featuredVideo
      featuredImage {
        fluid(quality: 80, maxWidth: 1300) {
          ...GatsbyContentfulFluid
        }
      }
      tags {
        name
      }
      excerpt {
        excerpt
      }
      client {
        name
      }
      contact {
        phone
        title
        firstName
        lastName
        email
      }
      awards {
        contentful_id
        description
        title
        fluid: fluid(quality: 80, maxWidth: 500) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        json
      }
    }
  }
`
