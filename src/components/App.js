import React from 'react'
import { IdProvider } from './IdManager'
import NoSSR from './NoSSR'
import CookieToast from './CookieToast'
import { GlobalStyle } from '../style'
import '../lib/iconLibrary'
import '../assets/fonts/circular.css'

export default function App({ children }) {
  return (
    <IdProvider>
      <GlobalStyle />
      {children}
      <NoSSR>
        <CookieToast />
      </NoSSR>
    </IdProvider>
  )
}
