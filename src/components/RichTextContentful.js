/* eslint react/forbid-prop-types: 0 */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { H1, H2, H3, Text } from './Text'
import { UnorderedList, ListItem } from './List'
import { Grid, Column } from './Grid'
import Image from './Image'
import Link from './Link'
import EmbedPlayer from './EmbedPlayer'
import Video from './Video'
import { ThemeContext } from '../context/ThemeContext'

const uniqueId = require('lodash.uniqueid')

function getImageData(data, name) {
  if (data.target.fields[name] && data.target.fields[name]['en-GB']) {
    const imageData = data.target.fields[name]['en-GB']

    if (imageData.fields.file && imageData.fields.file['en-GB']) {
      return (
        <Image
          alt={imageData.fields.title && imageData.fields.title['en-GB']}
          src={imageData.fields.file['en-GB'].url}
        />
      )
    }
  }
  return null
}

function getVideoData(data, name, aspect) {
  if (data.target.fields[name] && data.target.fields[name]['en-GB']) {
    return (
      <Video
        src={data.target.fields[name]['en-GB']}
        aspect={
          data.target.fields[aspect]
            ? data.target.fields[aspect]['en-GB']
            : undefined
        }
        key={uniqueId('video')}
        bg="transparent"
      />
    )
  }
  return null
}

function isUrlAbsolute(url) {
  return url.indexOf('://') > 0 || url.indexOf('//') === 0
}

const options = (pr, pl, sm = '12', md = '8', lg = '8') => {
  return {
    renderText: content =>
      content
        .split('\n')
        .flatMap((content, i) => [i > 0 && <br key={i} />, content]),
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        const theme = useContext(ThemeContext)
        return (
          <Column
            sm={sm}
            md={md}
            lg={lg}
            mb={[0, 0]}
            pr={pr}
            pl={pl}
            key={uniqueId('col')}
          >
            <H1 textColor={theme.color} key={uniqueId('h1')}>
              {children}
            </H1>
          </Column>
        )
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        const theme = useContext(ThemeContext)
        return (
          <Column
            sm={sm}
            md={md}
            lg={lg}
            mb={[0, 0]}
            pr={pr}
            pl={pl}
            key={uniqueId('col')}
          >
            <H2 textColor={theme.color} key={uniqueId('h2')}>
              {children}
            </H2>
          </Column>
        )
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        const theme = useContext(ThemeContext)
        return (
          <Column
            sm={sm}
            md={md}
            lg={lg}
            mb={[0, 0]}
            pr={pr}
            pl={pl}
            key={uniqueId('col')}
          >
            <H3 textColor={theme.color} key={uniqueId('h3')}>
              {children}
            </H3>
          </Column>
        )
      },

      [BLOCKS.PARAGRAPH]: (node, children) => {
        const theme = useContext(ThemeContext)
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
          return (
            <Column key={uniqueId('col')}>
              <Video src={videoLink} key={uniqueId('video')} />
            </Column>
          )
        }

        if (vimeoLink) {
          return (
            <Column key={uniqueId('col')}>
              <EmbedPlayer src={vimeoLink} bg="transparent" />
            </Column>
          )
        }

        return (
          <Column sm={sm} md={md} lg={lg} pr={pr} pl={pl} key={uniqueId('col')}>
            <Text textColor={theme.color} key={uniqueId('text')}>
              {children}
            </Text>
          </Column>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const isAbsolute = isUrlAbsolute(node.data.uri)
        const theme = useContext(ThemeContext)
        return (
          <Link
            rel={isAbsolute ? 'nofollow,noopener,noreferrer' : ''}
            target={isAbsolute ? '_blank' : ''}
            href={node.data.uri}
            textColor={theme.linkColor}
            styleVariant={theme.theme}
            variant="blue"
            key={uniqueId('link')}
          >
            {children}
          </Link>
        )
      },
      [BLOCKS.UL_LIST]: (node, children) => (
        <Column
          sm={sm}
          md={md}
          lg={lg}
          mb={[0, 0]}
          pr={pr}
          pl={pl}
          key={uniqueId('col')}
        >
          <UnorderedList key={uniqueId('ul')}>{children}</UnorderedList>
        </Column>
      ),
      [BLOCKS.LIST_ITEM]: node => (
        <ListItem key={uniqueId('li')}>
          {node.content[0].content[0].value}
        </ListItem>
      ),
      [BLOCKS.EMBEDDED_ASSET]: ({
        data: {
          target: { fields },
        },
      }) => {
        if (fields && fields.file && fields.file['en-GB']) {
          const file = fields.file['en-GB']
          return (
            <Column md={12} pr={pr} pl={pl} key={uniqueId('col')}>
              <Image
                alt={fields.description && fields.description['en-GB']}
                src={file.url}
                key={uniqueId('image')}
              />
            </Column>
          )
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => {
        if (
          data.target.sys.contentType &&
          data.target.sys.contentType.sys.id === 'col2'
        ) {
          const image1 = getImageData(data, 'image1')
          const image2 = getImageData(data, 'image2')
          const video1 = getVideoData(data, 'videoLink1', 'videoAspectRatio1')
          const video2 = getVideoData(data, 'videoLink2', 'videoAspectRatio2')

          return (
            <Grid pl={[0, 0]} pr={[0, 0]} key={uniqueId('grid')}>
              <Column sm={6} key={uniqueId('col')}>
                {image1 || video1}
              </Column>
              <Column sm={6} key={uniqueId('col')}>
                {image2 || video2}
              </Column>
            </Grid>
          )
        }
        return null
      },
    },
  }
}
const RichText = ({ md, pr, pl, document }) => {
  return documentToReactComponents(document, options(pr, pl, md))
}

RichText.propTypes = {
  document: PropTypes.object,
}

export default RichText
