import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from './Link'
import { breakpoints, breakpointNr, fluidRange } from '../style'
import { getActiveLangPath } from './SelectLanguage'
import { ThemeContext } from '../context/ThemeContext'

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
      fontSize: '18px',
    },
  }
}

const TagsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  line-height: 1.4;
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

export default function Tags({ items, linked = true, textColor, ...rest }) {
  const theme = useContext(ThemeContext)

  if (!items || !items.length) {
    return null
  }

  return (
    <TagsWrapper {...rest} textColor={textColor}>
      <TagList>
        {items.map(item => (
          <Li key={item.name}>
            {linked ? (
              <Link
                href={`${getActiveLangPath()}/work?filter=${encodeURIComponent(
                  item.name.toLowerCase(),
                )}`}
                textColor={textColor}
                styleVariant={theme.theme}
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
