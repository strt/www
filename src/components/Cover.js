import React from 'react'
import styled from 'styled-components'
import { colors } from '../style'

const CoverWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 56.25%;
  background-color: ${colors.black};

  canvas,
  video,
  iframe,
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default function Cover(props) {
  return <CoverWrapper {...props} />
}
