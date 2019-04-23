const { resolve } = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

// // Inlined version of subfont
// // (https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-subfont)
// exports.onPostBuild = ({ store }) => {
//   const root = path.join(store.getState().program.directory, `public`)

//   require('child_process').execSync(`npx subfont -i --no-recursive --inline-css --root ${root}`)
// }

// // Use to debug bundle size
// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     plugins: [new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin()],
//   })
// }

exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  const redirectToSlugMap = new Map()
  function registerRedirectsFromNode(node) {
    if (node.fields.redirect) {
      const { slug } = node.fields
      let redirect = JSON.parse(node.fields.redirect)
      if (!Array.isArray(redirect)) {
        redirect = [redirect]
      }

      redirect.forEach(fromPath => {
        if (redirectToSlugMap.has(fromPath)) {
          console.error(
            `Duplicate redirect detected from "${fromPath}" to:\n` +
              `* ${redirectToSlugMap.get(fromPath)}\n` +
              `* ${slug}\n`,
          )
          process.exit(1)
        }

        const toPath = slug.startsWith('/') ? slug : `/${slug}`
        redirectToSlugMap.set(fromPath, slug)

        createRedirect({
          fromPath,
          redirectInBrowser: true,
          isPermanent: true,
          toPath,
        })
      })
    }
  }

  const result = await graphql(`
    {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "/^((?!/employees/).)*$/" }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
              template
              redirect
            }
            frontmatter {
              title
              client
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw Error(result.errors)
  }

  const { edges } = result.data.allMdx

  // Pages
  const pages = edges.filter(
    ({ node }) =>
      node.fileAbsolutePath.includes('/pages/') ||
      node.fileAbsolutePath.includes('/open-positions/'),
  )
  pages.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: resolve(`./src/templates/${node.fields.template}.js`),
      context: {
        slug: node.fields.slug,
      },
    })

    registerRedirectsFromNode(node)
  })

  // Case
  const cases = edges.filter(({ node }) => node.fields.template === 'case')
  cases.forEach(({ node }, index) => {
    const { node: next } =
      index === cases.length - 1 ? cases[0] : cases[index + 1]

    createPage({
      path: node.fields.slug,
      component: resolve(`./src/templates/${node.fields.template}.js`),
      context: {
        slug: node.fields.slug,
        next,
      },
    })

    registerRedirectsFromNode(node)
  })

  // Posts
  const posts = edges.filter(({ node }) => node.fields.template === 'post')
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: resolve(`./src/templates/${node.fields.template}.js`),
      context: {
        slug: node.fields.slug,
      },
    })

    registerRedirectsFromNode(node)
  })
}

function buildRedirectString(permalink, redirectFrom) {
  if (!permalink || !permalink.endsWith('.html')) {
    return redirectFrom ? JSON.stringify(redirectFrom) : ''
  }

  const basePath = permalink.slice(0, -'.html'.length)
  let redirects = [basePath, `${basePath}/`]
  if (Array.isArray(redirectFrom)) {
    redirects = redirects.concat(redirectFrom)
  }

  return JSON.stringify(redirects)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)

  if (node.internal.type === 'Mdx') {
    const { relativePath } = getNode(node.parent)
    const { redirect_from: redirectFrom, permalink } = node.frontmatter
    let { template = 'standard' } = node.frontmatter
    let slug = permalink || createFilePath({ node, getNode, basePath: 'pages' })

    if (relativePath.startsWith('posts')) {
      template = 'post'
      slug = slug.replace('/posts', '/news')
    }

    if (relativePath.startsWith('case')) {
      template = 'case'
      slug = slug.replace('/case', '/work')
    }

    if (relativePath.startsWith('open-positions')) {
      slug = slug.replace('/open-positions', '/join-us')
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    createNodeField({
      node,
      name: 'template',
      value: template,
    })

    createNodeField({
      node,
      name: 'redirect',
      value: buildRedirectString(slug, redirectFrom),
    })
  }
}
