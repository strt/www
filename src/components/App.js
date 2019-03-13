import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import { IdProvider } from './IdManager'
import NoSSR from './NoSSR'
import CookieToast from './CookieToast'
import components from './MDXComponents'
import { GlobalStyle } from '../style'
import '../lib/iconLibrary'
import '../assets/fonts/circular.css'

export default function App({ children }) {
  return (
    <MDXProvider components={components}>
      <IdProvider>
        <GlobalStyle />
        {children}
        <NoSSR>
          <CookieToast />
        </NoSSR>
      </IdProvider>
    </MDXProvider>
  )
}
