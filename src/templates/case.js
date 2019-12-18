import React, { useContext } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Hero from '../components/Hero'
import Link from '../components/Link'
import { base, Text, Excerpt, H1, H3, H4, H6 } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import Cover from '../components/Cover'
import Icon from '../components/Icon'
import Image from '../components/Image'
import EmbedPlayer from '../components/EmbedPlayer'
import { ScrollToTopButton } from '../components/Button'
import Tags from '../components/Tags'
import ContentWrapper from '../components/ContentWrapper'
import { fluidRange, breakpoints, breakpointNr } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'
import RichText from '../components/RichTextContentful'
import { formatPhone } from '../lib/format'
import Awards from '../components/Awards'

const StyledH1 = styled(H1)`
  margin-bottom: 0.175em;
  font-size: 4em;
  font-weight: 400;
  line-height: 1.1em;
  ${base}
  color: ${props => props.textColor};

  @media ${breakpoints.medium} {
    font-size: 6.1875em;
    letter-spacing: -0.05em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 99,
      max: 148.5,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 9.28125em;
  }
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
        <Grid
          justifyContent="space-between"
          alignItems={['flex-start', 'center']}
          flexWrap="nowrap"
        >
          {client && (
            <Column width="auto">
              <H4 mb="0" textColor={theme.color}>
                {client.name}
              </H4>
            </Column>
          )}
          <Column width="auto">
            <Tags items={tags} textColor={theme.color} />
          </Column>
        </Grid>
        <Hero pt={[2, 7]} pb={[5, 7]}>
          <StyledH1 textColor={theme.color}>{title}</StyledH1>
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
          <Grid>
            {contact && (
              <Column md="8" mt={[4, 6]}>
                <H3 textColor={theme.color}>Would you like to know more?</H3>
                <Text textColor={theme.color}>
                  Contact {contact.firstName} {contact.lastName},{' '}
                  {contact.title}
                  <br />
                  <Link
                    textColor={theme.color}
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </Link>
                  <br />
                  <Link
                    textColor={theme.color}
                    href={`tel:${formatPhone(contact.phone)}`}
                  >
                    {contact.phone}
                  </Link>
                </Text>
              </Column>
            )}
          </Grid>
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
    contentfulCase: contentfulCases(
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
          ...GatsbyContentfulFluid
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
