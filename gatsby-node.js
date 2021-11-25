const { resolve } = require('path')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

function getLangOptions(node) {
  const localePath = node.node_locale === 'sv' ? '' : `/en`
  const slug = node.slug === '/' ? '/' : `/${node.slug}/`

  return {
    localePath,
    slug,
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  // ============= PAGES =============

  const contentfulPages = await graphql(`
    {
      allContentfulPages {
        edges {
          node {
            name
            title
            template
            node_locale
            slug
            alias
          }
        }
      }
    }
  `)

  contentfulPages.data.allContentfulPages.edges.forEach(({ node }) => {
    const { slug, localePath } = getLangOptions(node)

    const template = node.template ? node.template.toLowerCase() : 'standard'
    const fullpath = `${localePath}${slug}`

    createPage({
      path: fullpath,
      component: resolve(`./src/templates/${template}.js`),
      context: {
        locale: node.node_locale,
        slug: node.slug,
      },
    })

    if (node.alias) {
      node.alias.forEach(alias => {
        createRedirect({
          fromPath: `${localePath}/${alias}/`,
          toPath: fullpath,
          statusCode: 200,
        })
      })
    }
  })

  // ============= CASES =============

  const contentfulCases = await graphql(`
    {
      allContentfulCase {
        edges {
          node {
            slug
            title
            node_locale
            alias
          }
        }
      }
    }
  `)

  contentfulCases.data.allContentfulCase.edges.forEach(({ node }) => {
    const { slug, localePath } = getLangOptions(node)
    const path = localePath === '' ? 'case' : 'work'
    const fullpath = `${localePath}/${path}${slug}`

    createPage({
      path: fullpath,
      component: resolve(`./src/templates/case.js`),
      context: {
        slug: node.slug,
        locale: node.node_locale,
      },
    })

    if (node.alias) {
      node.alias.forEach(alias => {
        createRedirect({
          fromPath: `${localePath}/${alias}/`,
          toPath: fullpath,
          statusCode: 200,
        })
      })
    }
  })

  // ============= POSITIONS =============

  const contentfulPositions = await graphql(`
    {
      allContentfulPositions {
        edges {
          node {
            slug
            title
            node_locale
            alias
          }
        }
      }
    }
  `)

  contentfulPositions.data.allContentfulPositions.edges.forEach(({ node }) => {
    const { slug, localePath } = getLangOptions(node)
    const path = localePath === '' ? 'bli-en-av-oss' : 'join-us'
    const fullpath = `${localePath}/${path}${slug}`

    if (node.slug !== 'dummy') {
      createPage({
        path: fullpath,
        component: resolve(`./src/templates/position.js`),
        context: {
          slug: node.slug,
          locale: node.node_locale,
        },
      })
    }

    if (node.alias) {
      node.alias.forEach(alias => {
        createRedirect({
          fromPath: `${localePath}/${alias}/`,
          toPath: fullpath,
          statusCode: 200,
        })
      })
    }
  })

  // ============= POSTS =============

  const contentfulPosts = await graphql(`
    {
      allContentfulPosts {
        edges {
          node {
            slug
            title
            alias
            node_locale
          }
        }
      }
    }
  `)

  const posts = contentfulPosts.data.allContentfulPosts.edges
  posts.forEach(({ node }) => {
    const { slug, localePath } = getLangOptions(node)
    const path = localePath === '' ? 'aktuellt' : 'news'
    const fullpath = `${localePath}/${path}${slug}`

    createPage({
      path: fullpath,
      component: resolve(`./src/templates/post.js`),
      context: {
        slug: node.slug,
        locale: node.node_locale,
      },
    })

    if (node.alias) {
      node.alias.forEach(alias => {
        createRedirect({
          fromPath: `${localePath}/${alias}/`,
          toPath: fullpath,
          statusCode: 200,
        })
      })
    }
  })
}

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}
