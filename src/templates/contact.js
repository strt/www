import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Link from '../components/Link'
import Section from '../components/Section'
import Image from '../components/Image'
import { Grid, Column } from '../components/Grid'
import { H1, Excerpt, Text } from '../components/Text'
import { formatPhone } from '../lib/format'
import { breakpoints, fluidRange, vw, colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'

const SmallText = styled(Text)`
  font-size: ${fluidRange({ min: 11, max: 14 })};
  line-height: 0.75em;

  @media ${breakpoints.medium} {
    font-size: ${vw(16)};
  }
`

export default function Contact({ data }) {
  const { page, contacts } = data.contentfulPage

  return (
    <Layout meta={getMetaFromPost(data.contentfulPage.page)}>
      <Hero>
        <H1>{page.title}</H1>
        <Excerpt>{page.excerpt.excerpt}</Excerpt>
      </Hero>
      <Section mb={[4, 7]}>
        <Grid>
          {contacts.map(contact => (
            <Column md="4" key={contact.id}>
              <Text>
                <strong>{contact.city || contact.title}</strong>
                <br />
                {contact.address}
                {contact.address && ','}
                {contact.postalCode} {contact.city}
                {contact.city && <br />}
                <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                <br />
                <Link href={`tel:${formatPhone(contact.phone)}`}>
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
            <Column key={node.id} width="6" md="3" bottomGap>
              {node.image && (
                <Image
                  bg={colors.dark}
                  sizes="(min-width: 768px) 24vw, 46vw"
                  fluid={node.image.fluid}
                />
              )}
              <Text mt={[1, 1]} mb="0">
                {node.firstName} {node.lastName}
              </Text>
              <SmallText mb={0.5} textColor={colors.steel500}>
                {node.role}
              </SmallText>
              <SmallText mb={0.5}>
                <Link href={`mailto:${node.email}`}>{node.email}</Link>
              </SmallText>
              <SmallText mb="0">
                <Link href={`tel:${formatPhone(node.phone)}`}>
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
        title
        slug
        excerpt {
          excerpt
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
