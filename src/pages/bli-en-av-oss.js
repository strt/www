import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Div from '../components/Div'
import Cover from '../components/Cover'
import Section from '../components/Section'
import InstagramGrid from '../components/InstagramGrid'
import { H1, H2, H3, Text } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { breakpoints, colors } from '../style'

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
      <Section py="7">
        <Grid>
          <Column>
            <H2>Just nu söker vi</H2>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.dark} py="7">
        <Grid justifyContent="space-around">
          <Column tablet="4">
            <H3 textColor="white">Tre annan samma äng</H3>
            <Text textColor="white">
              Tre annan samma äng kom se sista genom sitt sin, smultron dunge
              bäckasiner häst hav sax göras själv kan, färdväg har bra därmed så
              samtidigt både söka. Och där hav göras icke jäst ordningens precis
              äng tre som blivit, bäckasiner hela vi ska söka upprätthållande
              stora hav att lax. Varit händer sällan är ingalunda häst mjuka
              omfångsrik rot björnbär räv, hans söka vi göras bland björnbär
              själv ännu plats kunde, där som nya så strand miljoner.
            </Text>
          </Column>
          <Column tablet="4">
            <H3 textColor="white">Tre annan samma äng</H3>
            <Text textColor="white">
              Tre annan samma äng kom se sista genom sitt sin, smultron dunge
              bäckasiner häst hav sax göras själv kan, färdväg har bra därmed så
              samtidigt både söka. Och där hav göras icke jäst ordningens precis
              äng tre som blivit, bäckasiner hela vi ska söka upprätthållande
              stora hav att lax. Varit händer sällan är ingalunda häst mjuka
              omfångsrik rot björnbär räv, hans söka vi göras bland björnbär
              själv ännu plats kunde, där som nya så strand miljoner.
            </Text>
          </Column>
        </Grid>
        <Grid justifyContent="space-around">
          <Column tablet="4">
            <H3 textColor="white">Tre annan samma äng</H3>
            <Text textColor="white">
              Tre annan samma äng kom se sista genom sitt sin, smultron dunge
              bäckasiner häst hav sax göras själv kan, färdväg har bra därmed så
              samtidigt både söka. Och där hav göras icke jäst ordningens precis
              äng tre som blivit, bäckasiner hela vi ska söka upprätthållande
              stora hav att lax. Varit händer sällan är ingalunda häst mjuka
              omfångsrik rot björnbär räv, hans söka vi göras bland björnbär
              själv ännu plats kunde, där som nya så strand miljoner.
            </Text>
          </Column>
          <Column tablet="4">
            <H3 textColor="white">Tre annan samma äng</H3>
            <Text textColor="white">
              Tre annan samma äng kom se sista genom sitt sin, smultron dunge
              bäckasiner häst hav sax göras själv kan, färdväg har bra därmed så
              samtidigt både söka. Och där hav göras icke jäst ordningens precis
              äng tre som blivit, bäckasiner hela vi ska söka upprätthållande
              stora hav att lax. Varit händer sällan är ingalunda häst mjuka
              omfångsrik rot björnbär räv, hans söka vi göras bland björnbär
              själv ännu plats kunde, där som nya så strand miljoner.
            </Text>
          </Column>
        </Grid>
      </Section>
      <Div
        halfTopBg={colors.dark}
        mb={[8, 19]}
        css={{
          '&::before': {
            height: '64%',
            [`@media ${breakpoints.medium}`]: { height: `${(3 / 5) * 100}%` },
          },
        }}
      >
        <Grid justifyContent="center">
          <Column tablet="10">
            <InstagramGrid />
          </Column>
        </Grid>
      </Div>
    </Layout>
  )
}
