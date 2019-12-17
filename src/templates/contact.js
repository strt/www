import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Link from '../components/Link'
import Section from '../components/Section'
import Image from '../components/Image'
import { Grid, Column } from '../components/Grid'
import { base, H1, Text } from '../components/Text'
import { formatPhone } from '../lib/format'
import { breakpoints, breakpointNr, fluidRange, colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'

const SmallText = styled(Text)`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.4em;
  ${base}
  font-size: 0.75em;

  @media ${breakpoints.medium} {
    font-size: 0.8em;
  }

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 16,
      max: 20,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  @media ${breakpoints.xlarge} {
    font-size: 1.25em;
  }

  a::after {
    bottom: -30%;
    background-size: 9px 11px;

    @media ${breakpoints.large} {
      bottom: -20%;
      background-size: 15px 11px;
    }
  }
`

export default function Contact({ data }) {
  const { page, contacts } = data.contentfulPage

  const theme = useContext(ThemeContext)
  if (theme.theme !== 'light') theme.toggleTheme('light')

  return (
    <Layout meta={getMetaFromPost(page)}>
      <Hero>
        <H1 textColor={theme.color}>{page.title}</H1>

        {page.excerpt && (
          <Column md={6} p={0}>
            <Text textColor={theme.color}>{page.excerpt.excerpt}</Text>
          </Column>
        )}
      </Hero>

      <Section mb={[4, 7]}>
        <Grid>
          {contacts.map((contact, index) => (
            <Column md={4} lg={index === 0 ? 6 : 3} key={contact.id}>
              <Text textColor={theme.color}>
                <strong>{contact.city || contact.title}</strong>
                <br />
                {contact.address}
                {contact.address && ','}
                {contact.postalCode} {contact.city}
                {contact.city && <br />}
                <Link
                  href={`mailto:${contact.email}`}
                  textColor={theme.color}
                  styleVariant={theme.theme}
                >
                  {contact.email}
                </Link>
                <br />
                <Link
                  href={`tel:${formatPhone(contact.phone)}`}
                  textColor={theme.color}
                  styleVariant={theme.theme}
                >
                  {contact.phone}
                </Link>
              </Text>
            </Column>
          ))}
        </Grid>
      </Section>
      <Section pb={[10, 20]}>
        <Grid>
          {data.employees.edges.map(({ node }) => (
            <Column key={node.id} width="6" md="3" bottomGap pt={2}>
              {node.image && (
                <Image
                  bg={colors.dark}
                  sizes="(min-width: 768px) 24vw, 46vw"
                  fluid={node.image.fluid}
                  overlay={node.color}
                />
              )}
              <Text textColor={theme.color} mt={[1, 1]} mb="0">
                {node.firstName} {node.lastName}
              </Text>
              <SmallText mb={0.5} textColor={theme.color}>
                {node.role}
              </SmallText>
              <SmallText mb={0.5} textColor={theme.color}>
                <Link
                  href={`mailto:${node.email}`}
                  textColor={theme.color}
                  styleVariant={theme.theme}
                >
                  {node.email}
                </Link>
              </SmallText>
              <SmallText mb="0" textColor={theme.color}>
                <Link
                  href={`tel:${formatPhone(node.phone)}`}
                  textColor={theme.color}
                  styleVariant={theme.theme}
                >
                  {node.phone}
                </Link>
              </SmallText>
            </Column>
          ))}
        </Grid>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulContactPage(
      page: { slug: { eq: $slug }, node_locale: { eq: $locale } }
    ) {
      page {
        id
        title
        slug
        excerpt {
          excerpt
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
      contacts {
        id
        title
        email
        phone
        address
        city
        postalCode
      }
    }
    employees: allContentfulEmployees(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [firstName, lastName] }
    ) {
      edges {
        node {
          id
          firstName
          lastName
          role
          email
          phone
          color
          image {
            fluid(quality: 80, maxWidth: 520) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
