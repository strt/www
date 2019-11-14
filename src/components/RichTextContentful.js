/* eslint react/forbid-prop-types: 0 */
import PropTypes from 'prop-types'
import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { H1, H2, H3, Text } from './Text'
import { UnorderedList } from './List'
import { Grid, Column } from './Grid'
import Image from './Image'
import Link from './Link'
import EmbedPlayer from './EmbedPlayer'
import Video from './Video'

function getImageData(data, name) {
  if (data.target.fields[name]) {
    const imageData = data.target.fields[name]['en-GB']
    return (
      <Image
        alt={imageData.fields.title && imageData.fields.title['en-GB']}
        src={imageData.fields.file['en-GB'].url}
      />
    )
  }
  return null
}

function getVideoData(data, name, aspect) {
  if (data.target.fields[name]) {
    return (
      <Video
        src={data.target.fields[name]['en-GB']}
        aspect={
          data.target.fields[aspect]
            ? data.target.fields[aspect]['en-GB']
            : undefined
        }
        bg="transparent"
      />
    )
  }
  return null
}

function isUrlAbsolute(url) {
  return url.indexOf('://') > 0 || url.indexOf('//') === 0
}

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
    [BLOCKS.PARAGRAPH]: (node, children) => {
      let vimeoLink = null
      let videoLink = null
      node.content.forEach(tag => {
        if (tag.data.uri && tag.data.uri.includes('player.vimeo')) {
          vimeoLink = tag.data.uri
          if (tag.data.uri.includes('external')) {
            videoLink = tag.data.uri
          }
        }
      })

      if (videoLink) {
        return <Video src={videoLink} />
      }

      if (vimeoLink) {
        return <EmbedPlayer src={vimeoLink} bg="transparent" />
      }

      return <Text>{children}</Text>
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const isAbsolute = isUrlAbsolute(node.data.uri)
      return (
        <Link
          rel={isAbsolute ? 'nofollow,noopener,noreferrer' : ''}
          target={isAbsolute ? '_blank' : ''}
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
      return (
        <Image
          alt={fields.description && fields.description['en-GB']}
          src={file.url}
        />
      )
    },
    [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => {
      if (data.target.sys.contentType.sys.id === 'col2') {
        const image1 = getImageData(data, 'image1')
        const image2 = getImageData(data, 'image2')
        const video1 = getVideoData(data, 'videoLink1', 'videoAspectRatio1')
        const video2 = getVideoData(data, 'videoLink2', 'videoAspectRatio2')

        return (
          <Grid>
            <Column md="6">{image1 || video1}</Column>
            <Column md="6">{image2 || video2}</Column>
          </Grid>
        )
      }
      return null
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
