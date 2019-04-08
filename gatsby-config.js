/* eslint-disable import/no-extraneous-dependencies, global-require */
const proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    siteUrl: 'https://strateg.se',
  },
  mapping: {
    'Mdx.frontmatter.contact_relation': 'Mdx.frontmatter.email',
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
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        commonmark: true,
        globalScope: `
          import EmbedPlayer from "$components/EmbedPlayer";
          import { Column } from "$components/Grid";
          import Image from "$components/Image";
          import Box from "$components/Box";
          import Video from "$components/Video";
          
          export default { EmbedPlayer, Column, Image, Box, Video };
        `,
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
        trackingId: 'UA-7298749-1',
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Strateg',
        short_name: 'Strateg',
        start_url: '.',
        background_color: '#ffffff',
        theme_color: '#0b101e',
        display: 'fullscreen',
        icon: 'src/assets/icon.png',
        include_favicon: false,
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
    'gatsby-plugin-netlify-cms',
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
