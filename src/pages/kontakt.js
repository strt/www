import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import { Grid, Column } from '../components/Grid'
import { H1, Excerpt, Text } from '../components/Text'
import { formatPhone } from '../utils'

export default function Contact({ data }) {
  const siteSettings = data.siteSettings.childContentJson

  return (
    <Layout title="Kontakt">
      <Hero>
        <H1>Här är vi. Allihop.</H1>
        <Excerpt>
          Vill du jobba med oss? Hos oss? Snacka om japansk kultur,
          skrattgaranti eller världens bästa låt? Här finns någon för alla.
        </Excerpt>
      </Hero>
      <Section mb={[4, 7]}>
        <Grid>
          <Column tablet="4">
            <Text>
              {siteSettings.name}
              <br />
              {siteSettings.contact.address}, {siteSettings.contact.zipcode}{' '}
              {siteSettings.contact.city}
              <br />
              <a href={`mailto:${siteSettings.contact.email}`}>
                {siteSettings.contact.email}
              </a>
              <br />
              <a href={`tel:${formatPhone(siteSettings.contact.phone)}`}>
                {siteSettings.contact.phone}
              </a>
            </Text>
          </Column>
          <Column tablet="4">
            <Text>
              Vill du jobba med Strateg?
              <br />
              Hör av dig till {data.clientContact.frontmatter.first_name}.
              <br />
              <a href={`mailto:${data.clientContact.frontmatter.email}`}>
                {data.clientContact.frontmatter.email}
              </a>
              <br />
              <a
                href={`tel:${formatPhone(
                  data.clientContact.frontmatter.phone,
                )}`}
              >
                {data.clientContact.frontmatter.phone}
              </a>
            </Text>
          </Column>
          <Column tablet="4">
            <Text>
              Vill du jobba eller praktisera på Strateg?
              <br />
              Hör av dig till {data.careerContact.frontmatter.first_name}.
              <br />
              <a href={`mailto:${data.careerContact.frontmatter.email}`}>
                {data.careerContact.frontmatter.email}
              </a>
              <br />
              <a
                href={`tel:${formatPhone(
                  data.careerContact.frontmatter.phone,
                )}`}
              >
                {data.careerContact.frontmatter.phone}
              </a>
            </Text>
          </Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Column>
            <Text>
              Vill du kontakta någon av oss skicka ett mejl till
              fornamn.efternamn[a]strateg.se
            </Text>
          </Column>
        </Grid>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query {
    siteSettings: file(relativePath: { eq: "settings.json" }) {
      childContentJson {
        name
        contact {
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
    careerContact: markdownRemark(
      frontmatter: { email: { eq: "malin.hakansson@strateg.se" } }
    ) {
      frontmatter {
        first_name
        email
        phone
      }
    }
  }
`
