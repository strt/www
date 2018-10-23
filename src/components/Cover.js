import React from 'react'
import styled from 'styled-components'
import { colors, breakpoints } from '../style'

const CoverWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background-color: ${colors.dark};

  @media screen and ${breakpoints.medium} {
    padding-top: 56.25%;
  }

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
