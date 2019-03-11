import React, { Suspense } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Cover from '../components/Cover'
import NoSSR from '../components/NoSSR'
import { H1, Excerpt } from '../components/Text'
import Link from '../components/Link'
import getMetaFromPost from '../lib/getMetaFromPost'

const Playground = React.lazy(() => import('../components/Playground'))

export default function NotFound({ data }) {
  const { title, excerpt } = data.page.frontmatter
  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt}</Excerpt>
        <Link to="/" colorVariant="blue" variant="large">
          Till startsidan
        </Link>
      </Hero>
      <Cover>
        <NoSSR>
          <Suspense fallback={null}>
            <Playground />
          </Suspense>
        </NoSSR>
      </Cover>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        excerpt
        seo {
          title
          description
          image {
            childImageSharp {
              og: resize(width: 1200, height: 630, quality: 80) {
                src
              }
            }
          }
        }
      }
    }
  }
`
