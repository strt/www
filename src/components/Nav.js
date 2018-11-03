import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { colors, easings, breakpoints, fluidRange } from '../style'

export const NavLink = styled(GatsbyLink)`
  margin-right: ${40 / 15.2}vw;
  display: inline-block;
  font-size: 4.8rem;
  font-weight: 900;
  text-decoration: none;
  color: white;

  &:last-child {
    margin-right: 0;
  }

  &[aria-current],
  &[data-active] {
    background-color: ${colors.pinkPeach};
  }

  @media ${breakpoints.medium} {
    font-size: ${20 / 15.2}vw;
    font-weight: 500;
    text-decoration: underline;
    color: ${colors.watermelonRed};
  }
`

export const Nav = styled.nav`
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: ${fluidRange({ min: 16, max: 24 })};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${colors.watermelonRed};
  transform: none;
  transition: transform 400ms ${easings.easeOutSine};

  &[hidden] {
    display: flex;
    transform: translateY(-100%);
  }

  @media ${breakpoints.medium} {
    position: static;
    flex-direction: row;
    padding: 0;
    transform: none;
    background-color: transparent;
  }
`
