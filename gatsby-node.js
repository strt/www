const { resolve } = require('path')

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const caseTemplate = resolve('src/templates/case.js')

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            html
            id
            frontmatter {
              date
              path
              title
              excerpt
              image
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)

    throw Error(allMarkdown.errors)
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: caseTemplate,
      context: {},
    })
  })
}
