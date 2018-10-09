import React from 'react'
import Layout from '../components/Layout'
import { H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function News() {
  return (
    <Layout title="Aktuellt">
      <Grid>
        <Column>
          <H1>Aktuellt</H1>
        </Column>
      </Grid>
    </Layout>
  )
}
