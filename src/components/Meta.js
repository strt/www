import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

export default function Meta({
  title,
  description,
  image,
  url,
  isArticle,
  children,
}) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              name
            }
          }
        }
      `}
    >
      {({ site: { siteMetadata } }) => (
        <Helmet
          htmlAttributes={{ lang: 'sv' }}
          title={title}
          titleTemplate="%s – Strateg"
          defaultTitle={siteMetadata.name}
        >
          {/* TODO: Remove before release */}
          <meta name="robots" content="noindex, nofollow" />

          {description && <meta name="description" content={description} />}

          {/* OpenGraph tags */}
          {url && <meta property="og:url" content={url} />}
          <meta property="og:site_name" content={siteMetadata.name} />
          <meta
            property="og:type"
            content={isArticle ? 'article' : 'website'}
          />
          <meta property="og:title" content={title} />
          {description && (
            <meta property="og:description" content={description} />
          )}
          {image && <meta property="og:image" content={image} />}
          {siteMetadata.facebook_app_id && (
            <meta property="fb:app_id" content={siteMetadata.facebook_app_id} />
          )}

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />

          {children}
        </Helmet>
      )}
    </StaticQuery>
  )
}
