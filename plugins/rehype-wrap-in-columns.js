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

module.exports = () => (tree) => {
  let isNestedInColumn = false

  function visitor(node, index, parent) {
    if (node.type === 'jsx' && node.value.includes('<Column')) {
      isNestedInColumn = true
      return 'skip'
    }

    if (node.type === 'jsx' && node.value.includes('</Column>')) {
      isNestedInColumn = false
      return 'skip'
    }

    if (!isNestedInColumn && (node.type === 'element' || node.type === 'jsx')) {
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
          topGap: isTextElement(node) && index !== 0 ? 'small' : undefined,
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
