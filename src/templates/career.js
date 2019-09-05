import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Cover from '../components/Cover'
import Link from '../components/Link'
import Section from '../components/Section'
import Image from '../components/Image'
import InstagramFeed from '../components/InstagramFeed'
import { H1, H2, H3, Excerpt, Text } from '../components/Text'
import { Grid, Column } from '../components/Grid'
import { colors } from '../style'
import getMetaFromPost from '../lib/getMetaFromPost'

export default function Career({ data }) {
  const { title, excerpt, image } = data.page.frontmatter
  const hasCover = !!image
  const hasOpenPositions = !!data.allContentfulPositions.edges.length

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
      {hasOpenPositions && (
        <Section bg={colors.dark} py={[5, 7]}>
          <Grid>
            <Column>
              <H2 textColor="white" mb={[3, 4]}>
                Open positions
              </H2>
              <ul>
                {data.allContentfulPositions.edges.map(({ node }) => (
                  <li key={node.id}>
                    <Excerpt mb={[2, 3]}>
                      <Link to={`join-us/${node.slug}`} colorVariant="white">
                        {node.role}
                      </Link>
                    </Excerpt>
                  </li>
                ))}
              </ul>
            </Column>
          </Grid>
        </Section>
      )}
      <Section pt={hasOpenPositions ? [5, 7] : 0}>
        <Grid>
          <Column>
            <H3>Spontaneous applications and internship</H3>
            <Text>
              <Link href="mailto:career@strateg.se">career@strateg.se</Link>
            </Text>
          </Column>
        </Grid>
      </Section>
      <Section bg={colors.dark} pt="0" mt={[8, 24]} pb={[12, 36]}>
        <InstagramFeed />
      </Section>
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
    allContentfulPositions {
      edges {
        node {
          id
          role
          slug
        }
      }
    }
  }
`
