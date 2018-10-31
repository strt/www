import React from 'react'
import Layout from '../components/Layout'
import { H1 } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function Career() {
  return (
    <Layout title="Bli en av oss">
      <Grid>
        <Column tablet="8">
          <H1>
            Vi vill vara ett jämställt team that delivers inspiring work and
            takes satisfaction from it varje dag, while growing collectively and
            individually.
          </H1>
        </Column>
      </Grid>
    </Layout>
  )
}
