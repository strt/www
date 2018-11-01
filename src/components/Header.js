import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Column } from './Grid'
import Logo from './Logo'
import Link from './Link'
import { colors, breakpoints } from '../style'
import routes from '../routes'

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

const LogoLink = styled(GatsbyLink)`
  display: block;
`

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
          <nav>
            {routes.map(route => (
              <NavLink key={route.link} to={route.link}>
                {route.title}
              </NavLink>
            ))}
          </nav>
        </Column>
      </Grid>
    </StyledHeader>
  )
}
