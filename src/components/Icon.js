import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core'

export const Svg = styled.svg`
  display: inline-block;
  vertical-align: -0.125em;
  height: 1em;
  overflow: visible;
  font-size: inherit;
  fill: currentColor;
  pointer-events: none;

  &:not(:root) {
    overflow: visible;
  }
`

function normalizeIconArgs(iconArgs) {
  if (iconArgs === null) {
    return null
  }

  if (typeof iconArgs === 'object' && iconArgs.prefix && iconArgs.iconName) {
    return iconArgs
  }

  if (Array.isArray(iconArgs) && iconArgs.length === 2) {
    const [prefix, iconName] = iconArgs

    return {
      prefix,
      iconName,
    }
  }

  if (typeof iconArgs === 'string') {
    return { prefix: 'far', iconName: iconArgs }
  }

  return null
}

export default function Icon({ name: iconArgs, ...rest }) {
  const iconLookup = findIconDefinition(normalizeIconArgs(iconArgs))

  if (!iconLookup) {
    console.warn(`Could not find icon "${iconArgs}"`)
    return null
  }

  const {
    icon: [width, height, , , path],
  } = iconLookup

  return (
    <Svg viewBox={`0 0 ${width} ${height}`} aria-hidden {...rest}>
      <path d={path} />
    </Svg>
  )
}

Icon.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      prefix: PropTypes.string,
      iconName: PropTypes.string,
    }),
  ]).isRequired,
}
