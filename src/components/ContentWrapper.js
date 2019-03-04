import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Column } from './Grid'
import { Text } from './Text'

const ContentWrapperStyle = styled.div`
  ${Column} {
    display: flex;
    flex-direction: column;
  }

  ${Text} {
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default function ContentWrapper({ children }) {
  return (
    <ThemeProvider theme={{ bottomGap: true }}>
      <ContentWrapperStyle>{children}</ContentWrapperStyle>
    </ThemeProvider>
  )
}
