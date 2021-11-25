/* eslint-disable import/no-extraneous-dependencies, global-require */
const proxy = require('http-proxy-middleware')
require('dotenv').config()

const siteUrl =
  process.env.ACTIVE_ENV === 'staging'
    ? 'https://strateg.dev'
    : 'https://strateg.se'

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        resolveEnv: () => process.env.ACTIVE_ENV,
        env: {
          staging: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        commonmark: true,
        rehypePlugins: [require('./plugins/rehype-wrap-in-columns')],
        remarkPlugins: [
          require('remark-unwrap-images'),
          require('remark-external-links'),
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'media',
            },
          },
          {
            resolve: require.resolve('./plugins/gatsby-remark-image-component'),
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/App.js'),
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GOOGLE_TAGMANAGER_ID,
        includeInDevelopment: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Strateg Agency',
        short_name: 'Strateg',
        start_url: '.',
        background_color: '#ffffff',
        theme_color: '#0b101e',
        display: 'fullscreen',
        icon: 'src/assets/icon.png',
      },
    },
    // 'gatsby-plugin-subfont', Enable again once it's less buggy
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        showSpinner: false,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cache',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `lxxyo1cefolk`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        environment: process.env.CONTENTFUL_ENVIRONMENT,
        accessToken:
          process.env.ACTIVE_ENV === 'staging'
            ? process.env.CONTENTFUL_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN,
        host:
          process.env.ACTIVE_ENV === 'staging'
            ? 'cdn.contentful.com'
            : 'cdn.contentful.com',
      },
    },
    'gatsby-plugin-client-side-redirect',
    `gatsby-plugin-meta-redirect`,
  ],
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    )
  },
}
