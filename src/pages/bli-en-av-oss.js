import React from 'react'
import Layout from '../components/Layout'
import { H1, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function Career() {
  return (
    <Layout title="Bli en av oss">
      <Grid>
        <Column>
          <H1>Det bästa med att jobba på Strateg.</H1>
          <Excerpt>
            Fina förmåner och utvecklingsmöjligheter i all ära, här på Strateg
            är det de lite mjukare värdena som smäller allra högst. Att vi har
            kul ihop. Att vi hjälper varandra att bli ännu bättre. Att vi bryr
            oss om varandra, på riktigt. Och nio-fikat så klart.
          </Excerpt>
        </Column>
      </Grid>
    </Layout>
  )
}
