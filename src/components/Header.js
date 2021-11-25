import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Column } from './Grid'
import Logo from './Logo'
import { breakpoints, fluidRange, vw } from '../style'
import SelectLanguageWrapper, { getActiveLangPath } from './SelectLanguage'
import Navigation from './Nav'
import { ThemeContext } from '../context/ThemeContext'

export default function Header({ mainMenu }) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <StyledHeader style={{ background: theme.background }}>
          <Grid justifyContent="space-between">
            <Column width="auto">
              <LogoLink to={`${getActiveLangPath()}/`}>
                <Logo />
              </LogoLink>
            </Column>
            <Column width="auto" className="langColumn">
              <ul
                style={{
                  display: 'flex',
                }}
              >
                <SelectLanguageWrapper />
              </ul>
            </Column>
            <Column width="auto">
              <Navigation menu={mainMenu} />
            </Column>
          </Grid>
        </StyledHeader>
      )}
    </ThemeContext.Consumer>
  )
}

const StyledHeader = styled.header`
  position: relative;
  padding: ${fluidRange({ min: 24, max: 32 })} 0;

  @media screen and ${breakpoints.small} {
    padding: ${34 / 7.68}vw 0;
  }

  @media screen and ${breakpoints.medium} {
    padding: ${vw(30)} 0 ${vw(56)} 0;
  }

  .langColumn {
    display: none;

    @media (min-width: 803px) {
      display: inherit;
      margin-left: auto;
    }

    @media (min-width: 1100px) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const LogoLink = styled(GatsbyLink)`
  display: block;
`
