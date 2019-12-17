import React from 'react'
import Link from './Link'
import { ThemeContext } from '../context/ThemeContext'

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

export default function SelectLanguage({ location }) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <>
          <li
            style={{
              padding: '0',
            }}
          >
            <Link
              onClick={() => {
                setActiveLang('sv')
              }}
              to={getUrl(location, 'sv')}
              textColor={theme.colorSecondary}
              styleVariant={theme.theme}
              variant="large"
            >
              Sv
            </Link>
          </li>
          <li style={{ padding: '0 5px' }}>
            <Link color={theme.colorSecondary} variant="large">
              /
            </Link>
          </li>

          <li>
            <Link
              to={getUrl(location, 'en')}
              onClick={() => {
                setActiveLang('en')
              }}
              textColor={theme.colorSecondary}
              styleVariant={theme.theme}
              variant="large"
            >
              En
            </Link>
          </li>
        </>
      )}
    </ThemeContext.Consumer>
  )
}
