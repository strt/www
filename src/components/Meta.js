import React from 'react'
import Helmet from 'react-helmet'
import useSiteSettings from '../lib/useSiteSettings'

export default function Meta({
  title,
  description,
  image,
  url,
  isArticle,
  children,
}) {
  const siteSettings = useSiteSettings()

  return (
    <Helmet
      htmlAttributes={{ lang: 'sv' }}
      title={title}
      titleTemplate={`%s – ${siteSettings.name}`}
      defaultTitle={siteSettings.name}
    >
      {/* TODO: Remove before release */}
      <meta name="robots" content="noindex, nofollow" />

      {description && <meta name="description" content={description} />}

      {/* OpenGraph tags */}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteSettings.name} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {siteSettings.social.facebook_app_id && (
        <meta
          property="fb:app_id"
          content={siteSettings.social.facebook_app_id}
        />
      )}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />

      {children}
    </Helmet>
  )
}
