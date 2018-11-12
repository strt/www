import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Column } from './Grid'
import Logo from './Logo'
import Link from './Link'
import Icon from './Icon'
import { IconButton } from './Button'
import Toggle from './Toggle'
import { colors, breakpoints, fluidRange } from '../style'
import routes from '../routes'
import { Nav, NavLink } from './Nav'

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
          <Toggle>
            {({ on, toggle }) => (
              <>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  as="button"
                  type="button"
                  textColor={colors.watermelonRed}
                  onClick={toggle}
                >
                  meny.
                </Link>
                <Nav hidden={!on}>
                  <IconButton type="button" onClick={toggle} textColor="white">
                    <Icon name={['fal', 'times']} />{' '}
                  </IconButton>
                  {routes.map(route => (
                    <NavLink key={route.link} to={route.link}>
                      {route.title}
                    </NavLink>
                  ))}
                </Nav>
              </>
            )}
          </Toggle>
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
    padding: ${56 / 15.2}vw 0;
  }
`

const LogoLink = styled(GatsbyLink)`
  display: block;
`
