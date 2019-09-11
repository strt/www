import React, { Fragment } from 'react'
import Link from './Link'

let selectedLang = null

if (typeof window !== 'undefined' && window.localStorage) {
  selectedLang = localStorage.getItem('selectedLang')
}

function setActiveLang(lang) {
  localStorage.setItem('selectedLang', lang)
  selectedLang = lang
}

export function getActiveLangPath() {
  if (!selectedLang || selectedLang === 'en') {
    return ''
  }
  return selectedLang
}

export function getUrl(location, country) {
  const path = country !== 'en' ? country : ''
  let finalUrl = ''

  if (selectedLang) {
    finalUrl = location.pathname.replace(`${selectedLang}`, '')
  }

  finalUrl = path + finalUrl

  return finalUrl
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
