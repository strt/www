/* eslint react/forbid-prop-types: 0 */
import PropTypes from 'prop-types'
import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { H1, H2, H3, Text } from './Text'
import { UnorderedList } from './List'
import Image from './Image'
import Link from './Link'

function isUrlAbsolute(url) {
  return url.indexOf('://') > 0 || url.indexOf('//') === 0
}

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [INLINES.HYPERLINK]: (node, children) => {
      const isAbsolute = isUrlAbsolute(node.data.uri)
      return (
        <Link
          rel={isAbsolute ? 'nfollow,noopener,noreferrer' : ''}
          blank={isAbsolute ? '_blank' : ''}
          href={node.data.uri}
        >
          {children}
        </Link>
      )
    },
    [BLOCKS.UL_LIST]: (node, children) => (
      <UnorderedList>{children}</UnorderedList>
    ),
    [BLOCKS.EMBEDDED_ASSET]: ({
      data: {
        target: { fields },
      },
    }) => {
      const file = fields.file['en-GB']
      return <Image alt={fields.description['en-GB']} src={file.url} />
    },
  },
}

const RichText = ({ document }) => {
  return documentToReactComponents(document, options)
}

RichText.propTypes = {
  document: PropTypes.object,
}

export default RichText
