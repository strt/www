import React from 'react'
import styled from 'styled-components'
import { Svg as BaseSvg } from './Icon'
import { colors, breakpoints } from '../style'

const Svg = styled(BaseSvg)`
  width: ${164 / 7.68}vw;
  min-width: 112px;
  height: auto;
  color: ${colors.dark};

  @media screen and ${breakpoints.medium} {
    width: ${188 / 15.2}vw;
  }
`

export default function Logo() {
  return (
    <Svg viewBox="0 0 98 21">
      <title>Strateg Marknadsföring</title>
      <path d="M61 10.7c0-1.8-1.2-2.9-2.6-2.9-1.5 0-2.7 1.2-2.7 2.9 0 1.8 1.1 3 2.7 3 1.5 0 2.6-1.2 2.6-3zm-.1 5.6v-1.5c-.5.7-1.5 1.5-3.1 1.5-3 0-5.2-2.4-5.2-5.6 0-3 2.1-5.6 5.2-5.6 1.8 0 2.8.8 3.2 1.6V5.4h2.9v10.9h-3zm-9.4-11h-.7c-.9 0-2.5.3-3.1 1.7V5.3h-2.9v11h3v-5c0-2.4 1.3-3.1 2.9-3.1.3 0 .6 0 .9.1v-3h-.1zM33.7 4.2C33.3 2.4 31.9.1 28 .1c-3 0-5.5 2.1-5.5 5 0 2.4 1.6 4 4.2 4.5l2.2.4c1.2.2 1.9 1 1.9 1.9 0 1.1-.9 1.9-2.6 1.9-2.2 0-3.3-1.4-3.5-3l-2.9.8c.2 2.3 2.1 5 6.3 5 3.7 0 5.7-2.5 5.7-4.9 0-2.2-1.5-4.1-4.4-4.7l-2.2-.4c-1.2-.2-1.7-.9-1.7-1.8 0-1.1 1-2 2.5-2 2 0 2.7 1.4 2.9 2.2l2.8-.8zM0 8.3h8.4v8.4H0V8.3zM8.2.1h8.4v8.4H8.2V.1zm84.3 13.2c-1.5 0-2.6-1.1-2.6-2.8 0-1.7 1.2-2.8 2.6-2.8 1.4 0 2.6 1.1 2.6 2.8 0 1.7-1.1 2.8-2.6 2.8zm-5.7 3.6c.3 2.1 2.3 4 5.4 4 4.2 0 5.8-2.8 5.8-5.8V5.3h-2.9v1.3c-.4-.7-1.4-1.5-3.1-1.5-3 0-5.1 2.5-5.1 5.4 0 3.1 2.2 5.4 5.1 5.4 1.6 0 2.6-.7 3.1-1.4v.8c0 2.1-1.1 3.1-2.9 3.1-1.4 0-2.4-.9-2.6-2.1l-2.8.6zm-4.2-4.5c-.4 1-1.1 1.7-2.5 1.7-1.5 0-2.7-1.1-2.8-2.5h7.9v-.9c0-3.5-2-5.7-5.5-5.7-2.8 0-5.4 2.3-5.4 5.8 0 3.7 2.7 5.9 5.7 5.9 2.7 0 4.5-1.6 5-3.5l-2.4-.8zm-5.2-2.9c.1-1 .9-2.2 2.5-2.2 1.7 0 2.4 1.1 2.5 2.2h-5zm-6.9-4.2h2.2v2.6h-2.2v4.6c0 1 .4 1.3 1.3 1.3.4 0 .8 0 .9-.1v2.5c-.3.1-.8.3-1.7.3-2.1 0-3.5-1.3-3.5-3.4V7.9h-2V5.3h.9c1.2 0 1.3-.4 1.3-1.4V2h2.7v3.3h.1zm-30.3 0h2.2v2.6h-2.2v4.6c0 1 .4 1.3 1.3 1.3.4 0 .8 0 .9-.1v2.5c-.3.1-.8.3-1.7.3-2.1 0-3.5-1.3-3.5-3.4V7.9h-2V5.3h.9c1.2 0 1.3-.4 1.3-1.4V2h2.7v3.3h.1z" />
    </Svg>
  )
}
