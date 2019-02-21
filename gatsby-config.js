/* eslint-disable-next-line import/no-extraneous-dependencies */
const proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    siteUrl: 'https://beta.strateg.se',
  },
  mapping: {
    'MarkdownRemark.frontmatter.contact_relation':
      'MarkdownRemark.frontmatter.email',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/media/`,
        name: 'media',
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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'media',
            },
          },
          'gatsby-remark-unwrap-images',
          'gatsby-remark-image-component',
          'gatsby-remark-embed',
        ],
      },
    },
    'gatsby-plugin-sitemap',
    // 'gatsby-plugin-subfont', Enable again once it's less buggy
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify-cms',
  ],
  developMiddleware: (app) => {
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
