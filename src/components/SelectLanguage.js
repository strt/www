import React, { useCallback } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router'
import Link from './Link'
import { TextSmall } from './Text'
import { breakpoints } from '../style'
import { ThemeContext } from '../context/ThemeContext'

let selectedLang = null

if (typeof window !== 'undefined' && window.location) {
  if (window.location.pathname.includes('/en')) {
    selectedLang = 'en'
  }
}

function setActiveLang(lang) {
  selectedLang = lang
}

export function getActiveLang() {
  if (!selectedLang || selectedLang === 'sv') {
    return 'sv'
  }
  return selectedLang
}

export function isDefaultLanguage() {
  return !selectedLang || selectedLang === 'sv'
}

export function getActiveLangPath() {
  if (!selectedLang || selectedLang === 'sv') {
    return ''
  }
  return `/${selectedLang}`
}

export function getUrl(location, country) {
  const langPath = country !== 'sv' ? `/${country}` : ''
  const url = location.pathname.replace(/^\/(en|sv)/, '')

  return langPath + url
}

const Li = styled.li`
  padding: 0;
  font-size: 1rem;

  @media ${breakpoints.small} {
    font-size: 1.125rem;
  }

  a {
    opacity: 0.56;

    &:active,
    &[aria-current],
    &[data-partially-current] {
      opacity: 1;
      text-decoration: underline;
    }


`

function SelectLanguage({ location, ...props }) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <Li style={{}}>
            <Link
              onClick={() => {
                setActiveLang('sv')
              }}
              to={getUrl(location, 'sv')}
              textColor={props.textColor || theme.color}
            >
              Sv
           </Link>
          </Li>
          <Li style={{ padding: '0 5px' }}>
            <TextSmall style={{ lineHeight: 'inherit' }}
              textColor={props.textColor || theme.color}
            >
              /
           </TextSmall>
          </Li>
          <Li>
            <Link
              to={getUrl(location, 'en')}
              onClick={() => {
                setActiveLang('en')
              }}
              textColor={props.textColor || theme.color}
            >
              En
           </Link>
          </Li>
        </>
      )}
    </ThemeContext.Consumer>
  )
}
export default function SelectLanguageWrapper({ textColor }) {
  const cb = useCallback(({ location }) => {
    return <SelectLanguage location={location} textColor={textColor} />
  }, [])
  return <Location>{cb}</Location>
}
