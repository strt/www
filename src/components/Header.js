import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Column } from './Grid'
import Logo from './Logo'
import Link from './Link'

const StyledHeader = styled.header`
  padding: 5.6rem 0;
`

export default function Header() {
  return (
    <StyledHeader>
      <Grid jusityContent="space-between">
        <Column>
          <Logo />
        </Column>
        <Link as={GatsbyLink} to="/">
          Hem
        </Link>
        <Link as={GatsbyLink} to="/case">
          Case
        </Link>
        <Link as={GatsbyLink} to="/vad-vi-gor">
          Vad vi gör
        </Link>
        <Link as={GatsbyLink} to="/bli-en-av-oss">
          Bli en av oss
        </Link>
        <Link as={GatsbyLink} to="/aktuellt">
          Aktuellt
        </Link>
        <Link as={GatsbyLink} to="/kontakt">
          Kontakt
        </Link>
      </Grid>
    </StyledHeader>
  )
}
