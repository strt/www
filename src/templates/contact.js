import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Link from '../components/Link'
import Section from '../components/Section'
import Image from '../components/Image'
import Div from '../components/Div'
import ContactArea from '../components/ContactArea'
import { Grid, Column } from '../components/Grid'
import { H1, Excerpt, Text } from '../components/Text'
import { formatPhone } from '../lib/format'
import { breakpoints, fluidRange, vw, colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'

const RoleText = styled(Text).attrs({ textColor: colors.steel500 })`
  font-size: ${fluidRange({ min: 11, max: 14 })};
  line-height: 1.2em;

  @media ${breakpoints.medium} {
    font-size: ${vw(16)};
  }
`

export default function Contact({ data }) {
  const siteSettings = data.siteSettings.childContentJson
  const { title, excerpt } = data.page.frontmatter

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt}</Excerpt>
      </Hero>
      <Section mb={[4, 7]}>
        <Grid>
          {siteSettings.offices.map(office => (
            <Column tablet="4" key={office.city}>
              <Text>
                <strong>{office.city}</strong>
                <br />
                {office.address}, {office.zipcode} {office.city}
                <br />
                <Link href={`mailto:${office.email}`}>{office.email}</Link>
                <br />
                <Link href={`tel:${formatPhone(office.phone)}`}>
                  {office.phone}
                </Link>
              </Text>
            </Column>
          ))}
          <Column tablet="4">
            <Text>
              Vill du jobba med Strateg?
              <br />
              Hör av dig till {data.clientContact.frontmatter.first_name}.
              <br />
              <Link href={`mailto:${data.clientContact.frontmatter.email}`}>
                {data.clientContact.frontmatter.email}
              </Link>
              <br />
              <Link
                href={`tel:${formatPhone(
                  data.clientContact.frontmatter.phone,
                )}`}
              >
                {data.clientContact.frontmatter.phone}
              </Link>
            </Text>
          </Column>
        </Grid>
      </Section>
      <Section pb={[10, 20]}>
        <Grid>
          <Column>
            <Text>
              Vill du kontakta någon av oss skicka ett mejl till
              fornamn.efternamn[a]strateg.se
            </Text>
          </Column>
          {data.employees.edges.map(({ node }) => (
            <Column key={node.id} width="6" tablet="3" bottomGap>
              {node.frontmatter.image && (
                <Image
                  fluid={node.frontmatter.image.childImageSharp.fluid}
                  sizes="(min-width: 768px) 24vw, 46vw"
                />
              )}
              <Text mt={[1, 1]} mb="0">
                {node.frontmatter.first_name} {node.frontmatter.last_name}
              </Text>
              <RoleText mb="0">{node.frontmatter.role}</RoleText>
            </Column>
          ))}
        </Grid>
      </Section>
      <Section bg={colors.dark} pt="0">
        <Div pt={[12, 18]} pb={[6, 14]}>
          <Grid>
            <Column>
              <ContactArea />
            </Column>
          </Grid>
        </Div>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        excerpt
        seo {
          title
          description
          image {
            childImageSharp {
              og: resize(width: 1200, height: 630, quality: 75) {
                src
              }
            }
          }
        }
      }
    }
    siteSettings: file(relativePath: { eq: "settings.json" }) {
      childContentJson {
        name
        offices {
          address
          zipcode
          city
          email
          phone
        }
      }
    }
    clientContact: markdownRemark(
      frontmatter: { email: { eq: "fredrik.vannestal@strateg.se" } }
    ) {
      frontmatter {
        first_name
        email
        phone
      }
    }
    employees: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/employees/" } }
      sort: { fields: [frontmatter___first_name, frontmatter___last_name] }
    ) {
      edges {
        node {
          id
          frontmatter {
            first_name
            last_name
            role
            image {
              childImageSharp {
                fluid(
                  quality: 80
                  maxWidth: 520
                  srcSetBreakpoints: [175, 328, 420]
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
