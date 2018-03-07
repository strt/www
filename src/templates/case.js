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
  query CaseByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        excerpt
        image
      }
    }
  }
`
