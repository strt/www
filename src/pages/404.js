import React, { Suspense } from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Cover from '../components/Cover'
import NoSSR from '../components/NoSSR'
import { H1, Excerpt } from '../components/Text'
import Link from '../components/Link'

const Playground = React.lazy(() => import('../components/Playground'))

export default function NotFound() {
  return (
    <Layout meta={{ titel: '404' }}>
      <Hero>
        <H1>Vad letar du efter, kompis?</H1>
        <Excerpt>
          Sidan du vill till finns tyvärr inte. Testa igen eller gå till
          startsidan, därifrån hittar du förhoppningsvis rätt.
        </Excerpt>
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
