/**
 * This is a modified version of react-no-ssr.
 * MIT License: https://github.com/kadirahq/react-no-ssr/blob/master/LICENSE
 */

import React from 'react'

const DefaultOnSSR = () => null

class NoSSR extends React.Component {
  state = {
    canRender: false,
  }

  componentDidMount() {
    this.setState({ canRender: true })
  }

  render() {
    const { children, onSSR = <DefaultOnSSR /> } = this.props
    const { canRender } = this.state

    return canRender ? children : onSSR
  }
}

export default NoSSR
