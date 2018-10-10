import React from 'react'
import Layout from '../components/Layout'
import { H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function NotFound() {
  return (
    <Layout title="404">
      <Grid>
        <Column>
          <H1>404 – Sidan hittades inte.</H1>
        </Column>
      </Grid>
    </Layout>
  )
}
