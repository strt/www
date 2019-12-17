/* stylelint-disable */

import React, { useContext } from 'react'
import styled from 'styled-components'
import { H1 } from './Text'
import { ThemeContext } from '../context/ThemeContext'

const StyledH1 = styled(H1)`
  color: ${props => props.theme.color};

  span:nth-child(${props => props.heroContent.colorWordPosition}):hover {
    animation-name: color;
    animation-duration: 0.75s;
    animation-iteration-count: infinite;
  }

  span:nth-child(${props => props.heroContent.replaceWordPosition}):hover {
    position: relative;
    color: ${props => props.theme.background};

    &::after {
      position: absolute;
      left: 0;
      content: '${props => props.heroContent.replaceWord}';
      color: ${props => props.theme.color};
    }
  }
`

export default function FrontH1({ ...props }) {
  const theme = useContext(ThemeContext)
  const { text } = props.heroContent
  return (
    <StyledH1
      {...props}
      theme={theme}
      dangerouslySetInnerHTML={{
        __html: text.replace(/[^\s]+/g, '<span>$&</span>'),
      }}
      p
    />
  )
}
