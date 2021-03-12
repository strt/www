import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Column } from './Grid'
import Logo from './Logo'
import { breakpoints, fluidRange, vw } from '../style'
import SelectLanguageWrapper, { getActiveLangPath } from './SelectLanguage'
import Navigation from './Nav'
import { ThemeContext } from '../context/ThemeContext'

export default function Header() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <StyledHeader style={{ background: theme.background }}>
          <Grid justifyContent="space-between">
            <Column smDown={4} md={5}>
              <LogoLink to={`${getActiveLangPath()}/`}>
                <Logo />
              </LogoLink>
            </Column>

            <Column smDown={4} md={2}>
              <ul
                style={{
                  display: 'flex',
                }}
              >
                <SelectLanguageWrapper />
              </ul>
            </Column>

            <Column smDown={4} md={5}>
              <Navigation />
            </Column>
          </Grid>
        </StyledHeader>
      )}
    </ThemeContext.Consumer>
  )
}

const StyledHeader = styled.header`
  padding: ${fluidRange({ min: 24, max: 32 })} 0;

  @media screen and ${breakpoints.small} {
    padding: ${34 / 7.68}vw 0;
  }

  @media screen and ${breakpoints.medium} {
    padding: ${vw(30)} 0 ${vw(56)} 0;
  }
`

const LogoLink = styled(GatsbyLink)`
  display: block;
`
