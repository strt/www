import React from 'react'
import Cookie from 'js-cookie'
import { ThemeProvider } from './src/context/ThemeContext'

require('focus-visible')

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)

export const onClientEntry = () => {
  window[`ga-disable-${process.env.GOOGLE_ANALYTICS_ID}`] = true

  if (Cookie.get('accept_cookies') === 'true' && Cookie.get('deny_analytics') === 'true') {
    window[`ga-disable-${process.env.GOOGLE_ANALYTICS_ID}`] = false
  }
}
