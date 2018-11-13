import React from 'react'
import { breakpoints } from '../style'

export default class MediaQuery extends React.Component {
  queries = Object.entries(breakpoints).reduce((acc, [key, value]) => {
    acc[key] = typeof window !== 'undefined' ? window.matchMedia(value) : {}

    return acc
  }, {})

  state = {
    media: Object.entries(this.queries).reduce((acc, [key, value]) => {
      acc[key] = value.matches || false
      return acc
    }, {}),
  }

  componentDidMount() {
    Object.entries(this.queries).forEach(([, mediaQueryList]) => {
      mediaQueryList.addListener(this.mediaListener)
    })
  }

  componentWillUnmount() {
    Object.entries(this.queries).forEach(([, mediaQueryList]) => {
      mediaQueryList.removeListener(this.mediaListener)
    })
  }

  mediaListener = ({ matches, media }) => {
    const key = Object.keys(this.queries).find(
      i => this.queries[i].media === media,
    )

    this.setState(state => ({
      media: {
        ...state.media,
        [key]: matches,
      },
    }))
  }

  render() {
    return this.props.children(this.state.media)
  }
}
