/* stylelint-disable */

import React from 'react'
import styled from 'styled-components'
import { H1 } from './Text'
import { colors } from '../style'

const StyledH1 = styled(H1)`
  span:nth-child(${props => props.heroContent.colorWordPosition}):hover {
    color: ${colors.yellow};
  }

  span:nth-child(${props => props.heroContent.replaceWordPosition}):hover {
    position: relative;
    color: ${colors.light};

    &::after {
      position: absolute;
      left: 0;
      content: '${props => props.heroContent.replaceWord}';
      color: ${colors.dark};
    }
  }
`

export default function FrontH1({ ...props }) {
  const { text } = props.heroContent
  return (
    <StyledH1
      {...props}
      dangerouslySetInnerHTML={{
        __html: text.replace(/\w+/g, '<span>$&</span>'),
      }}
    />
  )
}
