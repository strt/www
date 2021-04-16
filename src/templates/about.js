import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Cover from '../components/Cover'
import Image from '../components/Image'
import { Grid, Column } from '../components/Grid'
import { H1, H2, Excerpt, Text } from '../components/Text'
import Link from '../components/Link'
import RichText from '../components/RichTextContentful'
import getMetaFromPost from '../lib/getMetaFromPost'
import { formatPhone } from '../lib/format'

export default function About({ data }) {
  const { title, excerpt, image } = data.contentfulPage.page
  const { contact, description, contentColumns } = data.contentfulPage

  const hasCover = !!image

  const theme = useContext(ThemeContext)
  if (theme.theme !== 'dark') theme.toggleTheme('dark')

  return (
    <Layout meta={getMetaFromPost(data.contentfulPage.page)}>
      <Hero md={12} pb={hasCover ? undefined : 0} keepContentMargin={!hasCover}>
        {title && <H1 textColor={theme.color}>{title}</H1>}
        {excerpt && (
          <Excerpt textColor={theme.color}>{excerpt.excerpt}</Excerpt>
        )}
      </Hero>
      {hasCover && (
        <Cover>
          <Image fluid={image.childImageSharp.fluid} alt="" />
        </Cover>
      )}
      <Grid>
        {description && (
          <Column md={8} lg={7}>
            <Text textColor={theme.color} style={{ display: 'inline' }}>
              {description.description}
            </Text>
          </Column>
        )}
      </Grid>
      <Grid pt={7}>
        <Column>
          {/* <TextScroll>
            <Text
              textColor={colors.orange500}
            >
              Vi skapar förändring
      </Text>
          </TextScroll> */}
        </Column>
      </Grid>

      {contentColumns && (
        <Grid>
          {contentColumns.map(item => (
            <Column md={4} key={item.contentful_id}>
              {(() => {
                return (
                  <>
                    <H2 textColor={theme.color}>{item.title}</H2>
                    <RichText pr={0} pl={0} md={12} document={item.text.json} />
                  </>
                )
              })()}
            </Column>
          ))}
        </Grid>
      )}

      {contact && (
        <Grid>
          <Column pt={10} md="8" mt={[4, 6]}>
            <Text textColor={theme.color}>
              {contact.title}
              <br />
              <Link textColor={theme.color} href={`mailto:${contact.email}`}>
                {contact.email}
              </Link>
              <br />
              <Link
                textColor={theme.color}
                href={`tel:${formatPhone(contact.phone)}`}
              >
                {contact.phone}
              </Link>
            </Text>
          </Column>
        </Grid>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    contentfulPage: contentfulAboutPage(
      page: { slug: { eq: $slug }, node_locale: { eq: $locale } }
    ) {
      id
      subtitle
      description {
        description
      }
      contact {
        phone
        title
        firstName
        lastName
        email
      }
      contentColumns {
        contentful_id
        text {
          json
        }
        title
        image {
          fluid(quality: 80, maxWidth: 1200) {
            ...GatsbyContentfulFluid
          }
        }
      }
      page {
        id
        title
        slug
        excerpt {
          excerpt
        }
        body {
          json
        }
        seoTitle
        seoDescription {
          seoDescription
        }
        seoImage {
          og: resize(width: 1200, height: 630, quality: 80) {
            src
          }
        }
      }
    }
  }
`
