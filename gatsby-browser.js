import React from 'react'
import Cookie from 'js-cookie'
import * as Sentry from '@sentry/browser'
import { ThemeProvider } from './src/context/ThemeContext'

require('focus-visible')

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)

Sentry.init({
  dsn: process.env.SENTRY_KEY,
})

export const onClientEntry = () => {
  window[`ga-disable-${process.env.GATSBY_GOOGLE_ANALYTICS_ID}`] = true

  if (
    Cookie.get('accept_cookies') === 'true' &&
    Cookie.get('accept_analytics') === 'true'
  ) {
    window[`ga-disable-${process.env.GATSBY_GOOGLE_ANALYTICS_ID}`] = false
  }
}
