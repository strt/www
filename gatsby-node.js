const { resolve, join } = require('path')
const { execSync } = require('child_process')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     plugins: [new BundleAnalyzerPlugin()],
//   })
// }

// Inlined version of subfont
// (https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-subfont)
exports.onPostBuild = ({ store }) => {
  const root = join(store.getState().program.directory, `public`)

  execSync(`npx subfont -i --no-recursive --inline-css --root ${root}`)
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const caseTemplate = resolve('src/templates/case.js')
  const articleTemplate = resolve('src/templates/article.js')

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              client
              date
              tags
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    throw Error(allMarkdown.errors)
  }

  const { edges } = allMarkdown.data.allMarkdownRemark

  // Case
  const cases = edges.filter(({ node }) => node.fields.slug.includes('/case/'))

  cases.forEach(({ node }, index) => {
    const { node: next } =
      index === cases.length - 1 ? cases[0] : cases[index + 1]

    createPage({
      path: node.fields.slug,
      component: caseTemplate,
      context: {
        slug: node.fields.slug,
        next,
      },
    })
  })

  // News
  const articles = edges.filter(({ node }) =>
    node.fields.slug.includes('/aktuellt/'),
  )

  articles.forEach(({ node }, index) => {
    const { node: next } =
      index === articles.length - 1 ? articles[0] : articles[index + 1]

    createPage({
      path: node.fields.slug,
      component: articleTemplate,
      context: {
        slug: node.fields.slug,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}
