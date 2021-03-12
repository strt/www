import React from 'react'
import styled, { css } from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'
import { CleanTag } from './CleanTag'
import { fluidRange, breakpoints, breakpointNr, fontFamily } from '../style'

const UNDERLINE_VARIANTS = {
  dark: 'waveLight.svg',
  light: 'waveDark.svg',
  purple: 'waveDark.svg',
  gray: 'waveDark.svg',
}

function getUnderline(props) {
  return UNDERLINE_VARIANTS[props.styleVariant] || UNDERLINE_VARIANTS.dark
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

  }

  &:active,
  &[aria-current],
  &[data-partially-current] {

  }

  button& {
    user-select: none;
    border:none;
    background:none;
  }

  ${props =>
    props.variant === 'large' &&
    css`
      font-weight: 400;
      font-size: 1.1em;

      @media ${breakpoints.medium} {
        font-size: 1.25em;
      }

      @media ${breakpoints.large} {
        font-size: ${fluidRange({
      min: 20,
      max: 30,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
      }

      @media ${breakpoints.xlarge} {
        font-size: 1.875em;
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
  variant: PropTypes.oneOf(['large']),
  to: PropTypes.string,
  textColor: PropTypes.string,
  href: PropTypes.string,
}

export default Link
