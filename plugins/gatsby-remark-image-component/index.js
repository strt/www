const visitWithParents = require(`unist-util-visit-parents`)
const path = require(`path`)
const isRelativeUrl = require(`is-relative-url`)
const _ = require(`lodash`)
const { fluid } = require(`gatsby-plugin-sharp`)
const slash = require(`slash`)

async function generateImages({
  node,
  getNode,
  markdownNode,
  files,
  resolve,
  cache,
  reporter,
  options,
}) {
  const parentNode = getNode(markdownNode.parent)
  let imagePath
  if (parentNode && parentNode.dir) {
    imagePath = slash(path.join(parentNode.dir, node.url))
  } else {
    return null
  }

  const imageNode = _.find(files, (file) => {
    if (file && file.absolutePath) {
      return file.absolutePath === imagePath
    }
    return null
  })

  if (!imageNode || !imageNode.absolutePath) {
    return resolve()
  }

  const fluidResult = await fluid({
    file: imageNode,
    args: {
      maxWidth: 1440,
      quality: 70,
      ...options,
    },
    reporter,
    cache,
  })

  return fluidResult
}

module.exports = (
  { files, markdownNode, markdownAST, getNode, reporter, cache },
  pluginOptions,
) => {
  const markdownImageNodes = []
  visitWithParents(markdownAST, `image`, (node) => {
    markdownImageNodes.push({ node })
  })

  return Promise.all(
    markdownImageNodes.map(
      ({ node }) =>
        new Promise(async (resolve) => {
          const fileType = node.url.slice(-3)

          if (
            fileType !== `gif` &&
            fileType !== `svg` &&
            isRelativeUrl(node.url)
          ) {
            const image = await generateImages({
              node,
              resolve,
              getNode,
              markdownNode,
              files,
              reporter,
              cache,
              options: pluginOptions,
            })

            if (image) {
              /* eslint-disable no-param-reassign */
              node.type = `html`
              node.value = `<image-component fluid='${JSON.stringify(
                image,
              )}'></image-component>`
              /* eslint-enable no-param-reassign */
            }

            return resolve(node)
          }

          return resolve()
        }),
    ),
  )
}
