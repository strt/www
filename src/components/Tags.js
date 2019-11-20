import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import { colors, breakpoints, fluidRange, vw } from '../style'

export default function Tags({ items, linked = true, colorVariant, ...rest }) {
  if (!items || !items.length) {
    return null
  }

  return (
    <TagsWrapper {...rest}>
      <Hyphen />
      <TagList>
        {items.map(item => (
          <li key={item.name}>
            {linked ? (
              <Link
                href={`/work?filter=${encodeURIComponent(
                  item.name.toLowerCase(),
                )}`}
                colorVariant={colorVariant}
              >
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </li>
        ))}
      </TagList>
    </TagsWrapper>
  )
}

function tagsWrapperModifiers(props) {
  if (props.variant === 'small') {
    return {
      fontSize: fluidRange({ min: 11, max: 14 }),
      [`@media ${breakpoints.medium}`]: {
        fontSize: `${vw(14)}`,
      },
    }
  }

  return {
    fontSize: fluidRange({ min: 14, max: 18 }),
    [`@media ${breakpoints.medium}`]: {
      fontSize: `${vw(18)}`,
    },
  }
}

const TagsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  line-height: 0.8125em;
  ${tagsWrapperModifiers}
  color: ${props => props.textColor || colors.dark};
`

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  & li:not(:last-child) {
    &::after {
      content: ', ';
      white-space: pre;
    }
  }
`

const Hyphen = styled.span`
  flex-shrink: 0;

  &::before {
    content: '— ';
    white-space: pre;
  }
`
