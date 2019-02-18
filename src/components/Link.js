import React from 'react'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'
import { textSize } from './Text'
import { colors, fontFamily, easings } from '../style'

const COLOR_VARIANTS = {
  red: colors.watermelonRed500,
  blue: colors.blue500,
  dark: colors.dark,
  white: '#fff',
}

function getColor(props) {
  return COLOR_VARIANTS[props.colorVariant] || colors.dark
}

export const A = styled.a`
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  font-family: ${fontFamily};
  font-size: inherit;
  font-weight: 400;
  text-decoration: underline;
  color: ${props => getColor(props)};
  background: none;
  transition: background 200ms ${easings.easeOutQuad};

  &:hover {
    background-color: ${props => rgba(getColor(props), 0.1)};
  }

  &.focus-visible {
    background-color: ${props => rgba(getColor(props), 0.2)};
  }

  &:active,
  &[aria-current] {
    text-decoration: none;
  }

  ${props =>
    props.variant === 'large' &&
    css`
      font-weight: 500;
      ${textSize}
    `}
`

export default function Link({ to, ...props }) {
  if (to) {
    return <A as={GatsbyLink} to={to} {...props} />
  }

  return <A {...props} />
}

Link.propTypes = {
  colorVariant: PropTypes.oneOf(['blue', 'red', 'dark', 'white']),
  to: PropTypes.string,
  href: PropTypes.string,
}
