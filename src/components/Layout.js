import React from 'react'
import styled from 'styled-components'
import Meta from './Meta'
import SkipToContentLink from './SkipToContentLink'
import Header from './Header'
import Footer from './Footer'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex-grow: 1;
`

export default function Layout({ meta, hideFooter, children }) {
  return (
    <PageWrapper>
      <Meta {...meta} />
      <SkipToContentLink />
      <Header />
      <Main id="main-content">{children}</Main>
      {!hideFooter && <Footer />}
    </PageWrapper>
  )
}
