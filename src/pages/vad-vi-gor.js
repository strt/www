import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { H1, Excerpt } from '../components/Text'

export default function About({ data }) {
  const { title, excerpt } = data.page.frontmatter
  return (
    <Layout meta={{ title: 'Vad vi gör' }}>
      <Hero>
        <H1>{title}</H1>
        <Excerpt>{excerpt}</Excerpt>
      </Hero>
    </Layout>
  )
}

export const query = graphql`
  query {
    page: markdownRemark(fileAbsolutePath: { regex: "/pages/vad-vi-gor/" }) {
      frontmatter {
        title
        excerpt
      }
    }
  }
`
