import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import { TextSmall, H3 } from './Text'
import { colors, breakpoints } from '../style'

const CardWrapper = styled.div`
  bottom: -40%;
  right: 0;
  margin-left: auto;
  max-width: 75%;
  padding: 2rem;
  background-color: ${colors.orange100};

  h3 {
    padding-bottom: 1rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media ${breakpoints.small} {
    bottom: -20%;
    right: 0;
    max-width: 50%;
    padding: 4rem 4rem;
  }

  @media ${breakpoints.medium} {
    bottom: -30%;
    right: 0;
    max-width: 50%;
    padding: 4rem 5.5rem;
  }

  @media ${breakpoints.large} {
    bottom: -20%;
    padding: 5rem 6rem;
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
