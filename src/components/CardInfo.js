import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import { TextSmall, H3 } from './Text'
import { colors, breakpoints } from '../style'

const CardWrapper = styled.div`
  bottom: -20%;
  right: 0;
  margin-left: auto;
  max-width: 688px;
  padding: 2rem;
  background-color: ${colors.orange100};

  h3 {
    padding-bottom: 1rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media ${breakpoints.medium} {
    padding: 4rem 7.5rem;
  }
`

export default function Card({ title, text, link, linkText, position }) {
  return (
    <CardWrapper style={{ position: `${position}` }}>
      <H3>{title}</H3>
      <TextSmall>{text}</TextSmall>
      <TextSmall>
        <Link href={link}>{linkText}</Link>
      </TextSmall>
    </CardWrapper>
  )
}
