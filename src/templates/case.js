import React from 'react'
import Helmet from 'react-helmet'
import Hero from '../components/Hero'

export default function Template({ data }) {
  const { markdownRemark: post } = data
  console.log(post)

  return (
    <div>
      <Helmet title={post.frontmatter.title} />
      <Hero
        title={post.frontmatter.excerpt}
        excerpt={post.frontmatter.title}
        image={post.frontmatter.image}
      />
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query CaseByPath($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        title
        excerpt
        image
      }
    }
  }
`
