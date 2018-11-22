import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Grid, Column } from './Grid'
import { Text } from './Text'
import Section from './Section'
import { ScrollToTopButton } from './Button'
import routes from '../routes'
import { colors, breakpoints, fluidRange, vw } from '../style'

const CopyrightText = styled(Text)`
  font-size: ${fluidRange({ min: 10, max: 14 })};

  @media ${breakpoints.medium} {
    font-size: ${vw(12)};
  }
`

export default function Footer() {
  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "settings.json" }) {
            siteSettings: childContentJson {
              name
              contact {
                address
                zipcode
                city
                email
                phone
              }
              social {
                facebook
                instagram
                linkedin
                github
              }
            }
          }
        }
      `}
    >
      {({ file: { siteSettings } }) => (
        <Section as="footer" bg={colors.ice} py={[4, 7]}>
          <Grid>
            <Column tablet="3">
              <Text>
                {siteSettings.name} <br />
                {siteSettings.contact.address} <br />
                {siteSettings.contact.zipcode} {siteSettings.contact.city}
              </Text>
            </Column>
            <Column tablet="3">
              <Text>
                {siteSettings.contact.email && (
                  <>
                    <a href={`mailto:${siteSettings.contact.email}`}>
                      {siteSettings.contact.email}
                    </a>
                    <br />
                  </>
                )}
                {siteSettings.contact.phone && (
                  <a
                    href={`tel:${siteSettings.contact.phone.replace(
                      /\s/g,
                      '',
                    )}`}
                  >
                    {siteSettings.contact.phone}
                  </a>
                )}
              </Text>
            </Column>
            <Column tablet="3">
              <Text>
                <a
                  href={siteSettings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <br />
                <a
                  href={siteSettings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <br />
                <a
                  href={siteSettings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <br />
                <a
                  href={siteSettings.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <br />
              </Text>
            </Column>
            <Column tablet="3">
              <Text as="ul">
                {routes.map(route => (
                  <li key={route.link}>
                    <Link to={route.link}>{route.title}</Link>
                  </li>
                ))}
              </Text>
            </Column>
          </Grid>
          <Grid justifyContent="space-between" alignItems="flex-end" mt="4">
            <Column width="auto">
              <CopyrightText as="small">
                © 2018 <br />
                Strateg Marknadsföring <br />
                En del av{' '}
                <a
                  href="//diplomatgruppen.se/sv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Diplomatgruppen
                </a>
              </CopyrightText>
            </Column>
            <Column width="auto">
              <ScrollToTopButton />
            </Column>
          </Grid>
        </Section>
      )}
    </StaticQuery>
  )
}
