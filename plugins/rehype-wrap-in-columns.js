/* eslint-disable import/no-extraneous-dependencies */
const visit = require('unist-util-visit')
const findBefore = require('unist-util-find-before')

function isTextElement(node) {
  return (
    node.type === 'element' &&
    (node.tagName === 'p' ||
      node.tagName === 'h2' ||
      node.tagName === 'h3' ||
      node.tagName === 'h4')
  )
}

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
      const prevSibling = findBefore(parent, node, 'element')

      // Move node to an existing column if the previous sibling is a text element
      if (
        prevSibling &&
        prevSibling.children &&
        prevSibling.children.some(n => isTextElement(n)) &&
        isTextElement(node)
      ) {
        prevSibling.children.push(node)
        parent.children.splice(index, 1)

        return index
      }

      // eslint-disable-next-line no-param-reassign
      parent.children[index] = {
        type: 'element',
        tagName: 'column',
        properties: {
          tablet: isTextElement(node) ? 8 : 12,
          bottomGap: isTextElement(node) ? 'large' : undefined,
          topGap: isTextElement(node) ? 'small' : undefined,
        },
        children: [node],
      }
    }

    return visit.CONTINUE
  })
}
