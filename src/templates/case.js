import React, { useContext } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Hero from '../components/Hero'
import Link from '../components/Link'
import { Text, TextSmall, Excerpt, H1, H6 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Icon from '../components/Icon'
import Image from '../components/Image'
import EmbedPlayer from '../components/EmbedPlayer'
import { ScrollToTopButton } from '../components/Button'
import Tags from '../components/Tags'
import ContentWrapper from '../components/ContentWrapper'
import { breakpoints, colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'
import RichText from '../components/RichTextContentful'
import { formatPhone } from '../lib/format'
import Awards from '../components/Awards'
import { isDefaultLanguage } from '../components/SelectLanguage'

const ContactText = styled(Text)`
  padding-left: 0.75rem;
  border-left: 2px solid ${colors.grey300};
  font-size: 1rem;
  line-height: 1.4;
  @media ${breakpoints.medium} {
    padding-left: 0;
    border-left: none;
    padding-right: 0.75rem;
    border-right: 2px solid ${colors.grey300};
    font-size: 1.125rem;
    text-align: right;
  }
`

const Clientblock = styled.div`
  padding-left: 0.75rem;
  border-left: 2px solid ${colors.grey300};
`
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
  if (theme.theme !== 'light') theme.toggleTheme('light')

  return (
    <Layout meta={getMetaFromPost(data.contentfulCase)}>
      <article>
        <Grid justifyContent="space-between" alignItems="flex-start" pt={1}>
          <Column sm={12} md={8}>
            <Clientblock>
              {client && (
                <TextSmall mb="1" textColor={theme.color}>
                  {client.name}
                </TextSmall>
              )}
              <Tags items={tags} textColor={colors.grey600} />
            </Clientblock>
          </Column>

          {contact && (
            <Column sm={12} md={4}>
              <ContactText textColor={theme.color}>
                {isDefaultLanguage() ? 'Vill du veta mer?' : 'Your cup of tea?'}
                <br />
                {isDefaultLanguage() ? 'Kontakta ' : 'Contact '}
                {contact.firstName} {contact.lastName}
                <br />
                <Link
                  textColor={colors.grey600}
                  styleVariant={theme.theme}
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </Link>
                <br />
                <Link
                  textColor={colors.grey600}
                  styleVariant={theme.theme}
                  href={`tel:${formatPhone(contact.phone)}`}
                >
                  {contact.phone}
                </Link>
              </ContactText>
            </Column>
          )}
        </Grid>
        <Hero pb={[5, 7]}>
          <H1 textColor={theme.color}>{title}</H1>
          {excerpt && (
            <Excerpt textColor={theme.color}>{excerpt.excerpt}</Excerpt>
          )}
        </Hero>
        {(featuredImage || featuredVideo) && (
          <Cover bg={theme.background} isVideo={!!featuredVideo}>
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
          {body && (
            <ContentWrapper>
              <Grid>
                <RichText document={body.json} />
              </Grid>
            </ContentWrapper>
          )}
        </Section>
        {next && (
          <Section as="footer" bg={theme.background} py={[7, 7]}>
            <Grid>
              <Column>
                <H6 textColor={theme.color} mb={[3, 7]}>
                  Next case <Icon name={['fal', 'long-arrow-down']} />
                </H6>
                <H1 as="div">
                  <Link
                    as={Link}
                    to={next.fields.slug}
                    rel="next"
                    textColor={theme.color}
                  >
                    {next.frontmatter.client}
                  </Link>
                </H1>
              </Column>
            </Grid>
            <Grid justifyContent="flex-end" mt={[7, 4]}>
              <Column width="auto">
                <ScrollToTopButton textColor={theme.color} />
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
    contentfulCase: contentfulCase(
      slug: { eq: $slug }
      node_locale: { eq: $locale }
    ) {
      id
      title
      slug
      featuredVideo
      featuredImage {
        fluid(quality: 80, maxWidth: 3000) {
          ...GatsbyContentfulFluid
        }
        fixed: resize(width: 1200, height: 630, quality: 80) {
          src
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
          ...GatsbyContentfulFluid_noBase64
        }
      }
      body {
        json
      }
      seoTitle
      seoDescription {
        seoDescription
      }
      seoImage {
        og: resize(width: 1200, height: 630, quality: 80) {
          src
        }
      }
    }
  }
`
