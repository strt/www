import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import { colors, breakpoints, fluidRange } from '../style'

export default function Tags({ items }) {
  return (
    <TagsWrapper>
      <Hyphen />
      <TagList>
        {items.map(item => (
          <li key={item}>
            <TagLink href="/">{item}</TagLink>
          </li>
        ))}
      </TagList>
    </TagsWrapper>
  )
}

const TagsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  font-size: ${fluidRange({ min: 14, max: 18 })};
  line-height: 1.3em;

  @media ${breakpoints.medium} {
    font-size: ${18 / 15.2}vw;
  }
`

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  & li:not(:last-child) {
    &::after {
      content: ',\00a0';
    }
  }
`

const Hyphen = styled.span`
  flex-shrink: 0;

  &::before {
    content: '—\00a0';
  }
`

const TagLink = styled(Link).attrs({
  fontSize: 'inherit',
  thin: true,
  textColor: colors.dark,
})({})
