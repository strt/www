import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Hero from '../components/Hero'
import CardGrid from '../components/common/CardGrid'

export default ({ data }) => {
  const cases = data.allMarkdownRemark.edges.map(({ node }) => ({
    ...node,
    ...node.frontmatter,
    title: node.frontmatter.excerpt,
    subtitle: node.frontmatter.title,
    link: node.frontmatter.path,
  }))

  return (
    <Fragment>
      <Helmet title="Kommunikationsbyrån som gör skillnad" />
      <Hero
        title="Kommunkationsbyrån som gör skillnad"
        image="/images/hero.jpg"
        // backgroundVideo={{
        //   sources: [
        //     {
        //       url: 'https://d2jad1z5rfmglu.cloudfront.net/transcoded/startpage-2016.m3u8',
        //       type: 'application/x-mpegURL',
        //     },
        //     {
        //       url: 'https://d2jad1z5rfmglu.cloudfront.net/transcoded/startpage-2016.mp4',
        //       type: 'video/mp4',
        //     },
        //     {
        //       url: 'https://d2jad1z5rfmglu.cloudfront.net/transcoded/startpage-2016.webm',
        //       type: 'video/webm',
        //     },
        //   ],
        // }}
      />
      <CardGrid items={cases} />
    </Fragment>
  )
}

export const query = graphql`
  query LatestCases {
    allMarkdownRemark(limit: 8, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            path
            excerpt
            date
            image
          }
        }
      }
    }
  }
`
