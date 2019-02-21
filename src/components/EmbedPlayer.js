import React from 'react'
import styled from 'styled-components'
import { colors } from '../style'

const PlayerWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  background-color: ${colors.dark};

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default function EmbedPlayer({ title, ...props }) {
  return (
    <PlayerWrapper>
      <iframe title={title} {...props} />
    </PlayerWrapper>
  )
}
