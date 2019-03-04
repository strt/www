/* eslint-disable import/no-extraneous-dependencies */
const visit = require('unist-util-visit')
const is = require('hast-util-is-element')

module.exports = () => (tree) => {
  let isNestedInColumn = false

  visit(tree, ['element', 'jsx'], (node, index, parent) => {
    if (node.type === 'jsx' && node.value.includes('<Column')) {
      isNestedInColumn = true
      return visit.SKIP
    }

    if (node.type === 'jsx' && node.value.includes('</Column>')) {
      isNestedInColumn = false
      return visit.SKIP
    }

    if (!isNestedInColumn) {
      // eslint-disable-next-line no-param-reassign
      parent.children[index] = {
        type: 'element',
        tagName: 'column',
        properties: {
          tablet: is(node, 'image') || node.type === 'jsx' ? 12 : 8,
        },
        children: [node],
      }
    }

    return visit.CONTINUE
  })
}
