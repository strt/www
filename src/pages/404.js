import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { H1 } from '../components/Text'

export default function NotFound() {
  return (
    <Layout title="404">
      <Hero>
        <H1>404 – Sidan hittades inte.</H1>
      </Hero>
    </Layout>
  )
}
