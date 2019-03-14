import React from 'react'
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { Location } from '@reach/router'
import Helmet from 'react-helmet'
import useSiteSettings from '../lib/useSiteSettings'

export default function Meta({
  title,
  description = '',
  image = '',
  publishedTime,
  type = 'website',
  children,
}) {
  const siteSettings = useSiteSettings()

  return (
    <Location>
      {({ location }) => {
        return (
          <Helmet
            htmlAttributes={{ lang: 'sv' }}
            titleTemplate={`%s – ${siteSettings.name}`}
            defaultTitle={siteSettings.name}
          >
            {/* TODO: Remove before release */}
            <meta name="robots" content="noindex, nofollow" />

            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:site_name" content={siteSettings.name} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image && (
              <meta
                property="og:image"
                content={image ? siteSettings.siteUrl + image : ''}
              />
            )}
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
