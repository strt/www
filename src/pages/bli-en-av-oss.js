import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Cover from '../components/Cover'
import Section from '../components/Section'
import { H1, H2 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function Career() {
  return (
    <Layout title="Bli en av oss">
      <Hero scrollButtonElement="#cover">
        <H1>
          Vi vill vara ett jämställt team that delivers inspiring work and takes
          satisfaction from it varje dag, while growing collectively and
          individually.
        </H1>
      </Hero>
      <Cover id="cover" />
      <Section>
        <Grid>
          <Column>
            <H2>Loool</H2>
          </Column>
        </Grid>
      </Section>
    </Layout>
  )
}
