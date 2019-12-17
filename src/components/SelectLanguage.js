import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import { Text } from './Text'
import { breakpoints, colors } from '../style'

let selectedLang = null

if (typeof window !== 'undefined' && window.location) {
  if (window.location.pathname.includes('/sv')) {
    selectedLang = 'sv'
  }
}

function setActiveLang(lang) {
  selectedLang = lang
}

export function getActiveLangPath() {
  if (!selectedLang || selectedLang === 'en') {
    return ''
  }
  return `/${selectedLang}`
}

export function getUrl(location, country) {
  const langPath = country !== 'en' ? `/${country}` : ''
  const url = location.pathname.replace(`/${selectedLang}`, '')

  return langPath + url
}

const Li = styled.li`
  padding: '0';

  &:first-child {
    margin-left: 0;
    @media ${breakpoints.medium} {
      margin-left: auto;
    }
  }
`

export default function SelectLanguage({ location }) {
  return (
    <>
      <Li style={{}}>
        <Link
          onClick={() => {
            setActiveLang('sv')
          }}
          to={getUrl(location, 'sv')}
          textColor={colors.light}
          styleVariant="dark"
          variant="large"
        >
          Svenska
        </Link>
      </Li>
      <Li style={{ padding: '0 5px' }}>
        <Text style={{ lineHeight: 'inherit' }} textColor={colors.light}>
          /
        </Text>
      </Li>
      <Li>
        <Link
          to={getUrl(location, 'en')}
          onClick={() => {
            setActiveLang('en')
          }}
          textColor={colors.light}
          styleVariant="dark"
          variant="large"
        >
          English
        </Link>
      </Li>
    </>
  )
}
