import React from 'react'
import { colors } from '../style'

const defaultState = {
  color: 'white',
  toggleTheme: () => { },
}

// DO A SWITCH DEPENDING ON THEME

export const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light',
      background: colors.light,
      color: colors.darkText,
      linkColor: colors.linkDark,
      navColor: colors.grey600,
      colorSecondary: colors.dark,
    }
  }

  toggleTheme = colorToggle => {
    switch (colorToggle) {
      case 'light':
        this.setState({
          theme: colorToggle,
          background: colors.light,
          color: colors.darkText,
          linkColor: colors.linkDark,
          navColor: colors.grey600,
          colorSecondary: colors.dark,
        })
        break
      case 'lightGray':
        this.setState({
          theme: colorToggle,
          background: colors.grey050,
          color: colors.darkText,
          colorSecondary: colors.darkText,
          navColor: colors.grey600,
        })
        break
      case 'gray':
        this.setState({
          theme: colorToggle,
          background: colors.grey100,
          color: colors.darkText,
          colorSecondary: colors.darkText,
          navColor: colors.grey600,
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
          linkColor: colors.linkLight,
          colorSecondary: colors.light,
          navColor: colors.grey400,
        })
    }
  }

  render() {
    const { children } = this.props
    const { color } = this.state
    const { colorSecondary } = this.state
    const { background } = this.state
    const { theme } = this.state
    const { linkColor } = this.state
    const { navColor } = this.state

    return (
      <ThemeContext.Provider
        value={{
          color,
          colorSecondary,
          background,
          theme,
          linkColor,
          navColor,
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
