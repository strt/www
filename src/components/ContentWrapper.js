import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Column, getColumnMargin } from './Grid'
import { Text } from './Text'
import { ImageWrapper } from './Image'

const ContentWrapperStyle = styled.div`
  ${Column} {
    display: flex;
    flex-direction: column;

    ${ImageWrapper}:not(:last-child) {
      ${props => getColumnMargin(props)}
    }
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
