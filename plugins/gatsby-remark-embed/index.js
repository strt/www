/* eslint-disable import/no-extraneous-dependencies */
const visit = require('unist-util-visit')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', (node, index, parent) => {
    const { url } = node

    if (url.startsWith('youtube:') || url.startsWith('vimeo:')) {
      const videoUrl = url.replace(/^[\w]+:/, '')

      /* eslint-disable no-param-reassign */
      parent.type = 'html'
      parent.value = `<iframe src="${videoUrl}" ${
        node.title ? `title="${node.title}"` : ''
      }></iframe>`
      parent.children = []
      /* eslint-enable no-param-reassign */
    }
  })

  return markdownAST
}
