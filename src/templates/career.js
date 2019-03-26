import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Div from '../components/Div'
import Cover from '../components/Cover'
import Section from '../components/Section'
import Image from '../components/Image'
import InstagramFeed from '../components/InstagramFeed'
import { H1, H2, Excerpt } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { colors } from '../style'
import BoxSection from '../components/BoxSection'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function Career({ data }) {
  const { title, excerpt, image } = data.page.frontmatter
  const hasCover = !!image

  return (
    <Layout meta={getMetaFromPost(data.page)}>
      <Hero
        // scrollButtonElement="#cover"
        pb={hasCover ? undefined : 0}
        keepContentMargin={!hasCover}
      >
        <H1>{title}</H1>
        {excerpt && <Excerpt>{excerpt}</Excerpt>}
      </Hero>
      {hasCover && (
        <Cover id="cover">
          <Image
            fluid={image.childImageSharp.fluid}
            aspectRatio="auto"
            alt=""
          />
        </Cover>
      )}
      <Section pt={hasCover ? [5, 7] : 0} pb={[5, 8]}>
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
      <Section bg={colors.dark} pt="20" pb="25" />
      <InstagramFeed halfTopBg={colors.dark} mb={[8, 19]} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        excerpt
        image {
          childImageSharp {
            ...CoverImage
            og: resize(width: 1200, height: 630, quality: 80) {
              src
            }
          }
        }
        seo {
          title
          description
          image {
            childImageSharp {
              og: resize(width: 1200, height: 630, quality: 80) {
                src
              }
            }
          }
        }
      }
    }
  }
`
