/* eslint-disable-next-line import/no-extraneous-dependencies */
const proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    name: 'Strateg',
    siteUrl: 'https://beta.strateg.se',
    adress: 'Slöjdgatan 39',
    zipcode: '703 83',
    city: 'Örebro',
    email: 'info@strateg.se',
    phone: '019-673 44 00',
    facebook: 'https://www.facebook.com/strategmarknadsforing/',
    facebook_app_id: '',
    instagram: 'https://www.instagram.com/enstrateg/',
    linkedin: 'https://www.linkedin.com/company/strateg-marknadsf-ring-ab',
    github: 'https://github.com/strt',
  },
  mapping: {
    'MarkdownRemark.frontmatter.contact':
      'MarkdownRemark.frontmatter.contact_id',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    // 'gatsby-plugin-subfont', Enable again once it's less buggy
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-unwrap-images'],
      },
    },
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
