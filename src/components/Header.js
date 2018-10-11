import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid } from './Grid'
import Logo from './Logo'
import Link from './Link'
import { colors } from '../style'

const StyledHeader = styled.header`
  padding: 5.6rem 0;
`

const NavLink = styled(Link)`
  margin: 0 1.315vw;
  color: ${colors.red500};

  &[aria-current] {
    text-decoration: line-through;
  }
`

export default function Header() {
  return (
    <StyledHeader>
      <Grid justifyContent="space-between">
        <GatsbyLink to="/">
          <Logo />
        </GatsbyLink>
        <div>
          <NavLink to="/case">Case</NavLink>
          <NavLink to="/vad-vi-gor">Vad vi gör</NavLink>
          <NavLink to="/bli-en-av-oss">Bli en av oss</NavLink>
          <NavLink to="/aktuellt">Aktuellt</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>
        </div>
      </Grid>
    </StyledHeader>
  )
}
