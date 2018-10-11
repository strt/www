/* eslint-disable-next-line import/no-extraneous-dependencies */
const proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    name: 'Strateg Marknadsföring',
    siteUrl: 'https://strateg.netlify.com',
    adress: 'Slöjdgatan 39',
    zipcode: '703 83',
    city: 'Örebro',
    email: 'hej@strateg.se',
    phone: '019-673 44 00',
    facebook: 'https://www.facebook.com/strategmarknadsforing/',
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
    'gatsby-plugin-subfont',
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
        plugins: [],
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
