import React from 'react'
import Layout from '../components/Layout'
import { H1, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'

export default function Contact() {
  return (
    <Layout title="Kontakt">
      <Grid>
        <Column>
          <H1>Kontakt är det bästa vi vet.</H1>
          <Excerpt>
            Välkommen till Strateg. Till det stora, svarta huset. Lätt att
            hitta, lätt att parkera vid och väldigt lätt att tycka om. Fyllt med
            glädje, kreativitet och professionalism. Och så med alla oss
            strateger förstås. Du tittar väl in om du har vägarna förbi?
          </Excerpt>
        </Column>
      </Grid>
    </Layout>
  )
}
