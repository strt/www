/* eslint-disable import/no-extraneous-dependencies */
const visitWithParents = require('unist-util-visit-parents')
const path = require('path')
const isRelativeUrl = require('is-relative-url')
const { fluid } = require('gatsby-plugin-sharp')
const slash = require('slash')

async function generateImages({
  node,
  getNode,
  markdownNode,
  files,
  resolve,
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

  const imageNode = files.find(file => file.absolutePath === imagePath)

  if (!imageNode || !imageNode.absolutePath) {
    return resolve()
  }

  const args = {
    maxWidth: 1780,
    quality: 80,
    srcSetBreakpoints: [365, 724, 960, 1440],
    ...options,
  }

  const fluidResult = await fluid({
    file: imageNode,
    args,
    reporter,
  })

  const webpResult = await fluid({
    file: imageNode,
    args: {
      ...args,
      base64: false,
      toFormat: 'webp',
    },
    reporter,
  })

  return {
    ...fluidResult,
    srcSetWebp: webpResult.srcSet,
  }
}

module.exports = (
  { files, markdownNode, markdownAST, getNode, reporter },
  pluginOptions,
) => {
  const markdownImageNodes = []
  visitWithParents(markdownAST, 'image', node => {
    markdownImageNodes.push({ node })
  })

  return Promise.all(
    markdownImageNodes.map(
      ({ node }) =>
        new Promise(async resolve => {
          const fileType = node.url.slice(-3)

          if (
            fileType !== 'gif' &&
            fileType !== 'svg' &&
            isRelativeUrl(node.url)
          ) {
            const image = await generateImages({
              node,
              resolve,
              getNode,
              markdownNode,
              files,
              reporter,
              options: pluginOptions,
            })

            if (image) {
              /* eslint-disable no-param-reassign */
              node.type = 'element'
              node.data = {
                hName: 'image',
                hProperties: {
                  ...image,
                },
              }
              /* eslint-enable no-param-reassign */
            }

            return resolve(node)
          }

          return resolve()
        }),
    ),
  )
}
