import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Grid, Column } from './Grid'
import { Text } from './Text'

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
        <footer>
          <Grid>
            <Column tablet="1" />
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
          </Grid>
        </footer>
      )}
    </StaticQuery>
  )
}
