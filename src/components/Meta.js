import React from 'react'
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { Location } from '@reach/router'
import Helmet from 'react-helmet'
import useSiteSettings from '../lib/useSiteSettings'

export default function Meta({
  title,
  description = '',
  image: propImage,
  publishedTime,
  type = 'website',
  children,
}) {
  const siteSettings = useSiteSettings()
  const image =
    propImage ||
    siteSettings.siteUrl +
      siteSettings.seo.default_image.childImageSharp.resize.src

  return (
    <Location>
      {({ location }) => {
        return (
          <Helmet
            htmlAttributes={{ lang: 'sv' }}
            titleTemplate={`%s – ${siteSettings.shortName}`}
            defaultTitle={siteSettings.name}
          >
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta
              name="google-site-verification"
              content="yOEi9G2K6BAml0aaT6LSru-SnaJGs5e0v9krM6JeWZg"
            />

            <meta property="og:site_name" content={siteSettings.name} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta
              property="og:url"
              content={siteSettings.siteUrl + location.pathname}
            />
            {publishedTime && (
              <meta
                property="article:published_time"
                itemProp="datePublished"
                content={publishedTime}
              />
            )}
            {siteSettings.social.facebook_app_id && (
              <meta
                property="fb:app_id"
                content={siteSettings.social.facebook_app_id}
              />
            )}
            <meta name="twitter:card" content="summary_large_image" />

            {children}
          </Helmet>
        )
      }}
    </Location>
  )
}
