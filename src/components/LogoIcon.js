import React from 'react'
import styled from 'styled-components'
import { Svg as BaseSvg } from './Icon'
import { colors } from '../style'

const Svg = styled(BaseSvg)`
  width: ${75 / 7.68}vw;
  max-width: 75px;
  height: auto;
  color: ${colors.light};
`

const LogoIconWrapper = styled.div`
  padding-bottom: 310px;
`

export default function LogoIcon() {
  return (
    <LogoIconWrapper>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.42 74.42">
        <title>Strateg Marknadsföring</title>
        <path
          className="a"
          d="M39.195,74.42H0V35.226H35.226V0H74.42V39.195H39.195ZM4.465,69.955h30.76V39.195H4.465ZM39.195,35.226h30.76V4.465H39.195Z"
        />
      </Svg>
    </LogoIconWrapper>
  )
}
