import React, { Suspense } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Cover from '../components/Cover'
import { H1, Excerpt } from '../components/Text'
import Link from '../components/Link'

const Playground = React.lazy(() => import('../components/Playground'))

export default function NotFound() {
  return (
    <Layout title="404">
      <Hero>
        <H1>Ajdå.</H1>
        <Excerpt>Vi har letat men vi hittar inte sidan du söker.</Excerpt>
        <Link as={GatsbyLink} to="/">
          Gå till startsidan
        </Link>
      </Hero>
      <Cover>
        <Suspense>
          <Playground />
        </Suspense>
      </Cover>
    </Layout>
  )
}
