const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Strateg',
    author: 'Strateg Marknadsföring',
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
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
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: '@import "styles/core";',
        includePaths: [path.join(__dirname, 'src')],
      },
    },
    'gatsby-plugin-netlify-cms',
  ],
}
