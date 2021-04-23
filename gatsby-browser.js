import React from 'react'
import Cookie from 'js-cookie'
import { ThemeProvider } from './src/context/ThemeContext'

require('focus-visible')

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)

export const onClientEntry = () => {
  window[`ga-disable-${process.env.GOOGLE_ANALYTICS_ID}`] = true

  if (Cookie.get('accept_cookies')) {
    window[`ga-disable-${process.env.GOOGLE_ANALYTICS_ID}`] = false
  }
}
