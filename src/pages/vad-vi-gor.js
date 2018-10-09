import React from 'react'
import Layout from '../components/Layout'
import { H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function About() {
  return (
    <Layout title="Vad vi gör">
      <Grid>
        <Column>
          <H1>Vad vi gör</H1>
        </Column>
      </Grid>
    </Layout>
  )
}
