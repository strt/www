import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { H1, H2, Excerpt, Text } from '../components/Text'

export default function Contact() {
  return (
    <Layout title="Kontakt">
      <Hero>
        <H1>Välkommen till Strateg. Till det stora, svarta huset.</H1>
        <Excerpt>
          Strateg Marknadsföring
          <br />
          Slöjdgatan 39, 703 83 Örebro
          <br />
          hej@strateg.se
          <br />
          019-764 44 00
        </Excerpt>
        <H2>Vi finns här. Allihop.</H2>
        <Text>
          Vill du kontakta någon av oss skicka ett mejl till
          fornamn.efternamn[a]strateg.se
        </Text>
      </Hero>
    </Layout>
  )
}
