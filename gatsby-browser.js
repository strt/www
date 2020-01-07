import React from 'react'
import { ThemeProvider } from './src/context/ThemeContext'

require('focus-visible')

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
