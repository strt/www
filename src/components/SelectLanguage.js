import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router'
import Link from './Link'
import { Text } from './Text'
import { breakpoints, colors } from '../style'
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

  &:first-child {
    margin-left: 0;
    @media ${breakpoints.medium} {
      margin-left: auto;
    }
  }
`

function SelectLanguage({ location }) {
  const theme = useContext(ThemeContext)
  return (
    <>
      <Li style={{}}>
        <Link
          onClick={() => {
            setActiveLang('sv')
          }}
          to={getUrl(location, 'sv')}
          textColor={theme.color}
          styleVariant={theme.theme}
          variant="large"
        >
          Svenska
        </Link>
      </Li>
      <Li style={{ padding: '0 5px' }}>
        <Text style={{ lineHeight: 'inherit' }} textColor={theme.color}>
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
          styleVariant={theme.theme}
          variant="large"
        >
          English
        </Link>
      </Li>
    </>
  )
}

export default function SelectLanguageWrapper() {
  const cb = useCallback(({ location }) => {
    return <SelectLanguage location={location} />
  }, [])
  return <Location>{cb}</Location>
}
