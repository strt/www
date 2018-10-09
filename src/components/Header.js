import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid } from './Grid'
import Logo from './Logo'
import Link from './Link'

const StyledHeader = styled.header`
  padding: 5.6rem 0;
`

const NavLink = styled(Link)`
  margin: 0 0.8rem;
`

export default function Header() {
  return (
    <StyledHeader>
      <Grid justifyContent="space-between" alignItems="center">
        <GatsbyLink to="/">
          <Logo />
        </GatsbyLink>
        <div>
          <NavLink as={GatsbyLink} to="/">
            Hem
          </NavLink>
          <NavLink as={GatsbyLink} to="/case">
            Case
          </NavLink>
          <NavLink as={GatsbyLink} to="/vad-vi-gor">
            Vad vi gör
          </NavLink>
          <NavLink as={GatsbyLink} to="/bli-en-av-oss">
            Bli en av oss
          </NavLink>
          <NavLink as={GatsbyLink} to="/aktuellt">
            Aktuellt
          </NavLink>
          <NavLink as={GatsbyLink} to="/kontakt">
            Kontakt
          </NavLink>
        </div>
      </Grid>
    </StyledHeader>
  )
}
