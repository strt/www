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
          site {
            siteMetadata {
              name
              adress
              zipcode
              city
              email
              phone
              facebook
              instagram
              linkedin
              github
            }
          }
        }
      `}
    >
      {({ site: { siteMetadata } }) => (
        <Section as="footer" bg={colors.ice} py={[4, 7]}>
          <Grid>
            <Column tablet="3">
              <Text>
                {siteMetadata.name} <br />
                {siteMetadata.adress} <br />
                {siteMetadata.zipcode} {siteMetadata.city}
              </Text>
            </Column>
            <Column tablet="3">
              <Text>
                <a href={`mailto:${siteMetadata.email}`}>
                  {siteMetadata.email}
                </a>
                <br />
                <a href={`tel:${siteMetadata.phone}`}>{siteMetadata.phone}</a>
              </Text>
            </Column>
            <Column tablet="3">
              <Text>
                <a
                  href={siteMetadata.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <br />
                <a
                  href={siteMetadata.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <br />
                <a
                  href={siteMetadata.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <br />
                <a
                  href={siteMetadata.github}
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
                © 2018 Strateg Marknadsföring
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
