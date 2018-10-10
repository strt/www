import React from 'react'
import styled from 'styled-components'
import SeoAndMeta from './SeoAndMeta'
import { GlobalStyle } from '../style'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import '../assets/fonts/circular.css'

const Wrapper = styled.div`
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
    <Wrapper>
      <GlobalStyle />
      <Header />
      <SeoAndMeta title={title} description={description}>
        {meta}
      </SeoAndMeta>
      <Main>{children}</Main>
      {!hideFooter && <Footer />}
    </Wrapper>
  )
}
