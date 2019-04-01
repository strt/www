import React from 'react'
import styled from 'styled-components'
import { ratio, cover } from '../style'

const PlayerWrapper = styled.div`
  background-color: ${props => props.bg || 'transparent'};
  ${props =>
    ratio(
      props.aspectRatio
        ? { x: props.aspectRatio[0], y: props.aspectRatio[1] }
        : undefined,
    )}

  iframe {
    ${cover()}
    object-position: left;
  }
`

export default function EmbedPlayer({ title, bg, aspectRatio, ...props }) {
  return (
    <PlayerWrapper bg={bg} aspectRatio={aspectRatio}>
      <iframe
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        {...props}
      />
    </PlayerWrapper>
  )
}
