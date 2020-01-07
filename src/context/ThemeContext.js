import React from 'react'
import { colors } from '../style'

const defaultState = {
  color: 'white',
  toggleTheme: () => {},
}

// DO A SWITCH DEPENDING ON THEME

export const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'dark',
      background: colors.dark,
      color: colors.lightText,
      colorSecondary: colors.light,
    }
  }

  toggleTheme = colorToggle => {
    switch (colorToggle) {
      case 'light':
        this.setState({
          theme: colorToggle,
          background: colors.light,
          color: colors.darkText,
          colorSecondary: colors.dark,
        })
        break
      case 'gray':
        this.setState({
          theme: colorToggle,
          background: colors.lightGray,
          color: colors.darkText,
          colorSecondary: colors.darkText,
        })
        break
      case 'purple':
        this.setState({
          theme: colorToggle,
          background: colors.lightPurple,
          color: colors.purple,
          colorSecondary: colors.purple,
        })
        break
      default:
        this.setState({
          theme: colorToggle,
          background: colors.dark,
          color: colors.lightText,
          colorSecondary: colors.light,
        })
    }
  }

  render() {
    const { children } = this.props
    const { color } = this.state
    const { colorSecondary } = this.state
    const { background } = this.state
    const { theme } = this.state

    return (
      <ThemeContext.Provider
        value={{
          color,
          colorSecondary,
          background,
          theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}
export default ThemeContext
export { ThemeProvider }
