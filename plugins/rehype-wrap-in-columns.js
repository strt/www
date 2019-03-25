/* eslint-disable import/no-extraneous-dependencies */
const findBefore = require('unist-util-find-before')
const visitChildren = require('unist-util-visit-children')

function isTextElement(node) {
  return (
    node.type === 'element' &&
    (node.tagName === 'p' ||
      node.tagName === 'a' ||
      node.tagName === 'h2' ||
      node.tagName === 'h3' ||
      node.tagName === 'h4')
  )
}

module.exports = () => tree => {
  let isNestedInColumn = false

  function visitor(node, index, parent) {
    // Toggle flag if node is a Column
    if (node.type === 'jsx' && node.value.includes('Column')) {
      isNestedInColumn = !node.value.startsWith('</Column>')
      return 'skip'
    }

    // Wrap or group node if it's not nested in a Column
    if (!isNestedInColumn && (node.type === 'element' || node.type === 'jsx')) {
      const prevSibling = findBefore(parent, node, 'element')
      const isNodeTextElement = isTextElement(node)

      // Move node to an existing column if the previous sibling is a text element
      if (
        prevSibling &&
        prevSibling.children &&
        prevSibling.children.some(n => isTextElement(n)) &&
        isNodeTextElement
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
          md: isNodeTextElement ? 8 : 12,
          bottomGap: isNodeTextElement ? 'large' : undefined,
          topGap: isNodeTextElement && index !== 0 ? 'small' : undefined,
        },
        children: [node],
      }
    }

    return true
  }

  if (tree.children.length) {
    const visit = visitChildren(visitor)
    visit(tree)
  }
}
