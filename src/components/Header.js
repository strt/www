import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Column } from './Grid'
import Logo from './Logo'
import { breakpoints, fluidRange, vw } from '../style'
import Navigation from './Nav'

export default function Header() {
  return (
    <StyledHeader>
      <Grid justifyContent="space-between">
        <Column width="auto">
          <LogoLink to="/">
            <Logo />
          </LogoLink>
        </Column>
        <Column width="auto">
          <Navigation />
        </Column>
      </Grid>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  padding: ${fluidRange({ min: 24, max: 32 })} 0;

  @media screen and ${breakpoints.small} {
    padding: ${34 / 7.68}vw 0;
  }

  @media screen and ${breakpoints.medium} {
    padding: ${vw(56)} 0;
  }
`

const LogoLink = styled(GatsbyLink)`
  display: block;
`
