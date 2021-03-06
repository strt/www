import React from 'react'
import Cookie from 'js-cookie'
import { ThemeProvider } from './src/context/ThemeContext'

require('focus-visible')

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)

export const onClientEntry = () => {
  window[`ga-disable-${process.env.GATSBY_GOOGLE_ANALYTICS_ID}`] = true

  if (Cookie.get('accept_cookies') === 'true' && Cookie.get('accept_analytics') === 'true') {
    window[`ga-disable-${process.env.GATSBY_GOOGLE_ANALYTICS_ID}`] = false
  }
}
