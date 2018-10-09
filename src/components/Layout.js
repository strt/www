import React from 'react'
import SeoAndMeta from './SeoAndMeta'
import { GlobalStyle } from '../style'
import Header from './Header'

export default function Layout({ children, title, description, meta }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <SeoAndMeta title={title} description={description}>
        {meta}
      </SeoAndMeta>
      <main>{children}</main>
    </>
  )
}
