import React from 'react'
import styled from 'styled-components'
import { colors } from '../style'

const PlayerWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: ${props =>
    props.aspectRatio
      ? `${(props.aspectRatio[1] / props.aspectRatio[0]) * 100}%`
      : '56.25%'};
  overflow: hidden;
  background-color: ${props => props.bg || colors.dark};

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
