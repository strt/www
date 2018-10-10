import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
  flex-grow: 1;
`

export default function Main({ children }) {
  return <StyledMain id="main-content">{children}</StyledMain>
}
