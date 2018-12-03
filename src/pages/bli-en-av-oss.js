import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Div from '../components/Div'
import Cover from '../components/Cover'
import Section from '../components/Section'
import InstagramGrid from '../components/InstagramGrid'
import { H1, H2, H3, Text } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { colors } from '../style'
import BoxSection from '../components/BoxSection'

export default function Career({ data }) {
  const { title } = data.page.frontmatter

  return (
    <Layout title="Bli en av oss">
      <Hero scrollButtonElement="#cover">
        <H1>{title}</H1>
      </Hero>
      <Cover id="cover">
        <img src="/images/uploads/news-space.jpg" alt="" />
      </Cover>
      <Section py="7">
        <Grid>
          <Column>
            <H2>Just nu söker vi</H2>
          </Column>
        </Grid>
      </Section>
      <Div my="18">
        <BoxSection
          backgroundImage={null}
          title="Vi har alltid ett fönster öppet"
          excerpt="Blivit kunde faktor göras att år sjö och hwila har vidsträckt är, där trevnadens regn dag det och träutensilierna gör är löksås."
          link={{ text: 'Spontanansökan', href: '/' }}
        />
      </Div>
      <Section bg={colors.dark} pt="20" pb="25">
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
      <InstagramGrid halfTopBg={colors.dark} mb={[8, 19]} />
    </Layout>
  )
}

export const query = graphql`
  query {
    page: markdownRemark(fileAbsolutePath: { regex: "/pages/bli-en-av-oss/" }) {
      frontmatter {
        title
        excerpt
      }
    }
  }
`
