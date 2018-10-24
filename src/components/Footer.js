import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Grid, Column } from './Grid'
import { Text } from './Text'
import Link from './Link'
import { colors, breakpoints } from '../style'
import routes from '../routes'

const StyledFooter = styled.footer`
  padding: ${148 / 15.2}vw 0;
  background-color: ${colors.ice};

  ${Column}:last-child ${Text}:last-child {
    margin-bottom: 0;
  }

  @media screen and ${breakpoints.medium} {
    padding: ${80 / 15.2}vw 0 ${128 / 15.2}vw;
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
        <StyledFooter>
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
                <Link
                  textColor={colors.dark}
                  thin
                  href={`mailto:${siteMetadata.email}`}
                >
                  {siteMetadata.email}
                </Link>
                <br />
                <Link
                  textColor={colors.dark}
                  thin
                  href={`tel:${siteMetadata.phone}`}
                >
                  {siteMetadata.phone}
                </Link>
              </Text>
            </Column>
            <Column tablet="3">
              <Text>
                <Link
                  textColor={colors.dark}
                  thin
                  href={siteMetadata.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                <br />
                <Link
                  textColor={colors.dark}
                  thin
                  href={siteMetadata.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
                <br />
                <Link
                  textColor={colors.dark}
                  thin
                  href={siteMetadata.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
                <br />
                <Link
                  textColor={colors.dark}
                  thin
                  href={siteMetadata.github}
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
                {routes.map(route => (
                  <li key={route.link}>
                    <Link to={route.link} textColor={colors.dark} thin>
                      {route.title}
                    </Link>
                  </li>
                ))}
              </Text>
            </Column>
          </Grid>
        </StyledFooter>
      )}
    </StaticQuery>
  )
}
