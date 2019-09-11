import React, { Fragment } from 'react'
import Link from './Link'

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
  return selectedLang
}

export function getUrl(location, country) {
  const langPath = country !== 'en' ? country : ''
  const url = location.pathname.replace(`${selectedLang}/`, '')

  return langPath + url
}

export default function SelectLanguage({ location }) {
  return (
    <Fragment>
      <li style={{ padding: '0' }}>
        <Link
          onClick={() => {
            setActiveLang('sv')
          }}
          to={getUrl(location, 'sv')}
          colorVariant="dark"
          variant="large"
        >
          Sv
        </Link>
      </li>
      <li style={{ padding: '0 5px' }}>
        <Link colorVariant="dark" variant="large">
          /
        </Link>
      </li>

      <li>
        <Link
          to={getUrl(location, 'en')}
          onClick={() => {
            setActiveLang('en')
          }}
          colorVariant="dark"
          variant="large"
        >
          En
        </Link>
      </li>
    </Fragment>
  )
}
