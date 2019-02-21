/**
 * This is a modified version of gatsby-remark-unwrap-images.
 * MIT License: https://github.com/xuopled/gatsby-remark-unwrap-images/blob/master/LICENCE.md
 */

const visit = require(`unist-util-visit`)
const remove = require(`unist-util-remove`)

module.exports = ({ markdownAST }) => {
  visit(markdownAST, `paragraph`, (node, index, parent) => {
    const hasOnlyImagesNodes = node.children.every((child) => {
      return (
        child.type === 'image' ||
        (child.type === 'text' && child.value === '\n')
      )
    })

    if (!hasOnlyImagesNodes) {
      return undefined
    }

    remove(node, 'text')

    parent.children.splice(index, 1, ...node.children)

    return index
  })
}
