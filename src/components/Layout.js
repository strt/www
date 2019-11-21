import React from 'react'
import styled from 'styled-components'
import Meta from './Meta'
import Footer from './Footer'
import { ThemeContext } from '../context/ThemeContext'

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
    <ThemeContext.Consumer>
      {theme => (
        <PageWrapper className={theme.dark ? 'dark' : 'light'}>
          <Meta {...meta} />
          <Main id="main-content">{children}</Main>
          {!hideFooter && <Footer />}
        </PageWrapper>
      )}
    </ThemeContext.Consumer>
  )
}
