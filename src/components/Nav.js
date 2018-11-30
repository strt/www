import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { IconButton } from './Button'
import Link from './Link'
import { colors, easings, breakpoints, fluidRange, vw } from '../style'

export const NavButton = styled(Link)`
  @media ${breakpoints.medium} {
    display: none;
  }
`

function getProps({ isPartiallyCurrent }) {
  return isPartiallyCurrent ? { 'data-active': true } : null
}

export function NavLink(props) {
  return <StyledNavLink getProps={getProps} {...props} />
}

export const StyledNavLink = styled(GatsbyLink)`
  display: inline-block;
  margin-bottom: ${fluidRange({ min: 8, max: 12 })};
  font-size: ${fluidRange({ min: 36, max: 48 })};
  line-height: 1.2777777778em;
  font-weight: 700;
  text-decoration: none;
  color: white;

  &:last-child {
    margin-right: 0;
  }

  &[aria-current],
  &[data-active] {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateX(${fluidRange({ min: 24, max: 32 })});
  }

  @media ${breakpoints.medium} {
    margin-bottom: 0;
    margin-right: ${vw(40)};
    font-size: ${vw(20)};
    font-weight: 500;
    line-height: normal;
    text-decoration: underline;
    color: ${colors.watermelonRed};

    &[aria-current],
    &[data-active] {
      transform: none;
      text-decoration: none;
    }

    &[href='/'] {
      display: none;
    }
  }
`

export const Nav = styled.nav`
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: ${fluidRange({ min: 48, max: 56 })};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${colors.watermelonRed};
  transform: none;
  transition: transform 320ms ${easings.easeOutSine};

  &[hidden] {
    display: flex;
    transform: translateY(-100%);
  }

  ${IconButton} {
    position: absolute;
    top: ${fluidRange({ min: 24, max: 32 })};
    right: ${fluidRange({ min: 24, max: 32 })};
    font-size: ${fluidRange({ min: 32, max: 40 })};
    color: white;

    @media ${breakpoints.medium} {
      display: none;
    }
  }

  @media ${breakpoints.medium} {
    position: static;
    flex-direction: row;
    padding: 0;
    transform: none;
    background-color: transparent;
  }
`
