import React, { useCallback } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router'
import Link from './Link'
import { Text } from './Text'
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
  const url = location.pathname.replace(`/${selectedLang}`, '')

  return langPath + url
}

const Li = styled.li`
  padding: 0;
  font-size: 0.75rem;

  a {
    opacity: 0.65;

    &:active,
    &[aria-current],
    &[data-partially-current] {
      opacity: 1;
    }
`

function SelectLanguage({ location }) {
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
              textColor={theme.color}
            >
              Sv
           </Link>
          </Li>
          <Li style={{ padding: '0 5px' }}>
            <Text style={{ lineHeight: 'inherit', fontSize: '0.75rem' }}
              textColor={theme.color}
            >
              /
           </Text>
          </Li>
          <Li>
            <Link
              to={getUrl(location, 'en')}
              onClick={() => {
                setActiveLang('en')
              }}
              textColor={theme.color}
            >
              En
           </Link>
          </Li>
        </>
      )}


    </ThemeContext.Consumer>
  )
}

export default function SelectLanguageWrapper() {
  const cb = useCallback(({ location }) => {
    return <SelectLanguage location={location} />
  }, [])
  return <Location>{cb}</Location>
}
