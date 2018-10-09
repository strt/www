import React from 'react'
import Layout from '../components/Layout'
import { H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function ContactPage() {
  return (
    <Layout title="Kontakt">
      <Grid>
        <Column>
          <H1>Kontakt</H1>
        </Column>
      </Grid>
    </Layout>
  )
}
