import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import { breakpoints, breakpointNr, fluidRange } from '../style'
import { getActiveLangPath } from './SelectLanguage'

function tagsWrapperModifiers(props) {
  if (props.variant === 'small') {
    return {
      fontSize: '12px',
      [`@media ${breakpoints.medium}`]: {
        fontSize: '14px',
      },
      [`@media ${breakpoints.large}`]: {
        fontSize: fluidRange({
          min: 14,
          max: 24,
          viewportMin: breakpointNr.large,
          viewportMax: breakpointNr.xlarge,
        }),
      },
      [`@media ${breakpoints.xlarge}`]: {
        fontSize: '24px',
      },
    }
  }

  return {
    fontSize: '16px',
    [`@media ${breakpoints.medium}`]: {
      fontSize: '22px',
    },
    [`@media ${breakpoints.large}`]: {
      fontSize: fluidRange({
        min: 22,
        max: 28,
        viewportMin: breakpointNr.large,
        viewportMax: breakpointNr.xlarge,
      }),
    },
    [`@media ${breakpoints.xlarge}`]: {
      fontSize: '28px',
    },
  }
}

const TagsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  line-height: 0.8125em;
  ${tagsWrapperModifiers}
  color: ${props => props.textColor};
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

const Li = styled.li`
  color: ${props => props.textColor};
`

const Hyphen = styled.span`
  flex-shrink: 0;

  &::before {
    color: ${props => props.textColor};
    content: '— ';
    white-space: pre;
  }
`

export default function Tags({ items, linked = true, textColor, ...rest }) {
  if (!items || !items.length) {
    return null
  }

  return (
    <TagsWrapper {...rest} textColor={textColor}>
      <Hyphen />
      <TagList>
        {items.map(item => (
          <Li key={item.name}>
            {linked ? (
              <Link
                href={`/${getActiveLangPath()}/work?filter=${encodeURIComponent(
                  item.name.toLowerCase(),
                )}`}
                textColor={textColor}
              >
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </Li>
        ))}
      </TagList>
    </TagsWrapper>
  )
}
