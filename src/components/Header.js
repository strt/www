import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Column } from './Grid'
import Logo from './Logo'
import Link from './Link'
import { colors, breakpoints } from '../style'

const StyledHeader = styled.header`
  padding: ${40 / 6.4}vw 0;

  @media screen and ${breakpoints.small} {
    padding: ${34 / 7.68}vw 0;
  }

  @media screen and ${breakpoints.medium} {
    padding: ${56 / 15.2}vw 0;
  }
`

function BaseNavLink(props) {
  return (
    <Link
      getProps={({ isPartiallyCurrent }) =>
        isPartiallyCurrent ? { 'data-active': true } : null
      }
      {...props}
    />
  )
}

const NavLink = styled(BaseNavLink)`
  margin-right: ${40 / 15.2}vw;
  color: ${colors.watermelonRed};

  &:last-child {
    margin-right: 0;
  }

  &[aria-current],
  &[data-active] {
    text-decoration: line-through;
  }
`

export default function Header() {
  return (
    <StyledHeader>
      <Grid justifyContent="space-between">
        <Column width="auto">
          <GatsbyLink to="/">
            <Logo />
          </GatsbyLink>
        </Column>
        <Column width="auto">
          <nav>
            <NavLink to="/case">Case</NavLink>
            <NavLink to="/vad-vi-gor">Vad vi gör</NavLink>
            <NavLink to="/bli-en-av-oss">Bli en av oss</NavLink>
            <NavLink to="/aktuellt">Aktuellt</NavLink>
            <NavLink to="/kontakt">Kontakt</NavLink>
          </nav>
        </Column>
      </Grid>
    </StyledHeader>
  )
}
