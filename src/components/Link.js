import React from 'react'
import styled, { css } from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'
import { CleanTag } from './CleanTag'
import { breakpoints, fontFamily, colors } from '../style'

const UNDERLINE_VARIANTS = {
  dark: 'waveLight.svg',
  light: 'waveDark.svg',
  purple: 'waveDark.svg',
  gray: 'waveDark.svg',
  lightGray: 'waveDark.svg',
}

export const A = styled.a`
  position: relative;
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  font-family: ${fontFamily};
  font-size: inherit;
  font-weight: inherit;
  color: ${props => props.textColor};
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    text-decoration: none;
    background-color: ${colors.orange300};
  }

  &[aria-current],
  &[data-partially-current] {
    opacity: 1;
  }
  
  &:active {
    text-decoration: none;
    background-color: ${colors.orange100};
  }

  button& {
    user-select: none;
    border: none;
    background: none;
  }

  ${props =>
    props.variant === 'large' &&
    css`
      font-size: 1.125rem;
      line-height: 1.4;

      @media ${breakpoints.medium} {
        font-size: 1.5rem;
      }
    `}
  ${props =>
    props.variant === 'small' &&
    css`
      font-size: 1rem;
      line-height: 1.4;

      @media ${breakpoints.small} {
        font-size: 1.125rem;
      }
    `}
  ${props =>
    props.variant === 'blue' &&
    css`
      font-size: 1.125rem;
      line-height: 1.4;

      &:hover {
        color: ${colors.blue400};
      }

      @media ${breakpoints.medium} {
        font-size: 1.5rem;
      }
    `}
`

const RouterLink = props => {
  const { textColor, styleVariant, ...rest } = props
  return React.createElement(CleanTag, { as: GatsbyLink, ...rest })
}

const Link = React.forwardRef(({ to, ...props }, ref) => {
  if (to) {
    return <A as={RouterLink} to={to} {...props} ref={ref} />
  }

  return <A {...props} ref={ref} />
})

Link.propTypes = {
  styleVariant: PropTypes.oneOf(Object.keys(UNDERLINE_VARIANTS)),
  variant: PropTypes.oneOf(['large', 'small', 'blue']),
  to: PropTypes.string,
  textColor: PropTypes.string,
  href: PropTypes.string,
}

export default Link
