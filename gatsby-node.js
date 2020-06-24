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
  const { createPage } = actions

  const query = await graphql(`
    {
      allContentfulPages {
        edges {
          node {
            name
            title
            template
            node_locale
            slug
          }
        }
      }
    }
  `)
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
  const contentfulCases = await graphql(`
    {
      allContentfulCases {
        edges {
          node {
            slug
            title
            node_locale
          }
        }
      }
    }
  `)

  const contentfulPositions = await graphql(`
    {
      allContentfulPositions {
        edges {
          node {
            slug
            title
            node_locale
          }
        }
      }
    }
  `)

  const contentfulPages = query.data.allContentfulPages.edges
  contentfulPages.forEach(page => {
    const { slug, localePath } = getLangOptions(page.node)
    const template = page.node.template
      ? page.node.template.toLowerCase()
      : 'standard'

    createPage({
      path: `${localePath}${slug}`,
      component: resolve(`./src/templates/${template}.js`),
      context: {
        locale: page.node.node_locale,
        slug: page.node.slug,
      },
    })

    // registerRedirectsFromNode(page.node)
  })

  contentfulCases.data.allContentfulCases.edges.forEach(({ node }) => {
    const { slug, localePath } = getLangOptions(node)
    createPage({
      path: `${localePath}/work${slug}`,
      component: resolve(`./src/templates/case.js`),
      context: {
        slug: node.slug,
        locale: node.node_locale,
      },
    })

    // registerRedirectsFromNode(node)
  })
  contentfulPositions.data.allContentfulPositions.edges.forEach(({ node }) => {
    const { slug, localePath } = getLangOptions(node)
    if (node.slug !== 'dummy') {
      createPage({
        path: `${localePath}/join-us${slug}`,
        component: resolve(`./src/templates/position.js`),
        context: {
          slug: node.slug,
          locale: node.node_locale,
        },
      })
    }
    // registerRedirectsFromNode(node)
  })

  // Posts
  const posts = contentfulPosts.data.allContentfulPosts.edges
  posts.forEach(({ node }) => {
    const { slug, localePath } = getLangOptions(node)
    createPage({
      path: `${localePath}/news${slug}`,
      component: resolve(`./src/templates/post.js`),
      context: {
        slug: node.slug,
        locale: node.node_locale,
      },
    })

    // registerRedirectsFromNode(node)
  })
}

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}
