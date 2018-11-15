import React from 'react'
import styled from 'styled-components'
import Meta from './Meta'
import { GlobalStyle } from '../style'
import SkipNavLink from './SkipNav'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import '../utils/iconLibrary'
import '../assets/fonts/circular.css'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export default function Layout({
  children,
  title,
  description,
  meta,
  hideFooter,
}) {
  return (
    <PageWrapper>
      <Meta title={title} description={description}>
        {meta}
      </Meta>
      <GlobalStyle />
      <SkipNavLink />
      <Header />
      <Main>{children}</Main>
      {!hideFooter && <Footer />}
    </PageWrapper>
  )
}
