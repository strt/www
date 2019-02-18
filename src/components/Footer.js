import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Link from './Link'
import { Grid, Column } from './Grid'
import { Text } from './Text'
import Section from './Section'
import { ScrollToTopButton } from './Button'
import { footerNavigation } from '../routes'
import { colors, breakpoints, fluidRange, vw } from '../style'
import { formatPhone } from '../utils'

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
              <Text as="address">
                {siteSettings.name} <br />
                {siteSettings.contact.address} <br />
                {siteSettings.contact.zipcode} {siteSettings.contact.city}
              </Text>
            </Column>
            <Column tablet="3">
              <Text as="address">
                {siteSettings.contact.email && (
                  <>
                    <Link href={`mailto:${siteSettings.contact.email}`}>
                      {siteSettings.contact.email}
                    </Link>
                    <br />
                  </>
                )}
                {siteSettings.contact.phone && (
                  <Link href={`tel:${formatPhone(siteSettings.contact.phone)}`}>
                    {siteSettings.contact.phone}
                  </Link>
                )}
              </Text>
            </Column>
            <Column tablet="3">
              <Text>
                <Link
                  href={siteSettings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                <br />
                <Link
                  href={siteSettings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
                <br />
                <Link
                  href={siteSettings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
                <br />
                <Link
                  href={siteSettings.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
                <br />
              </Text>
            </Column>
            <Column tablet="3">
              <Text as="ul">
                {footerNavigation.map(route => (
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
                {siteSettings.name} <br />
                En del av{' '}
                <Link
                  href="//diplomatgruppen.se/sv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Diplomatgruppen
                </Link>
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
