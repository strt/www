import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

export default function SeoAndMeta({ title, description, children }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
    >
      {({ site: { siteMetadata } }) => (
        <Helmet
          htmlAttributes={{ lang: 'sv' }}
          titleTemplate="%s – Strateg"
          defaultTitle={siteMetadata.title}
        >
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
          {/* TODO: Remove before release */}
          <meta name="robots" content="noindex, nofollow" />
          {children}
        </Helmet>
      )}
    </StaticQuery>
  )
}
