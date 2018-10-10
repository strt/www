module.exports = {
  siteMetadata: {
    title: 'Strateg',
    author: 'Strateg Marknadsföring',
    siteUrl: 'https://strateg.netlify.com',
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
}
