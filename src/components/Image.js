import React from 'react'
import { noop } from '../utils'

// const cache = new Map()

// const STATES = {
//   PENDING: 'pending',
//   LOADING: 'loading',
//   FULFILLED: 'fulfilled',
//   FAILED: 'failed',
// }

function DefaultErrorFallback() {
  return <span>Error</span>
}

function DefaultLoadingFallback() {
  return <span>Loading...</span>
}

class Image extends React.Component {
  static defaultProps = {
    errorFallback: DefaultErrorFallback,
    loadingFallback: DefaultLoadingFallback,
    onLoad: noop,
  }

  // state = {
  //   status: this.props.src ? STATES.LOADING : STATES.PENDING,
  // }

  imageRef = React.createRef()

  render() {
    // const { status } = this.state
    const { src, fluid, ...props } = this.props

    if (typeof src === 'string') {
      return <img src={src} alt="" {...props} />
    }

    return (
      <img
        srcSet={fluid.src}
        sizes={fluid.sizes}
        src={fluid.src}
        alt=""
        {...props}
      />
    )

    // switch (status) {
    //   case STATES.LOADED:
    //     return <img src={this.props.src} alt={this.props.alt} />
    //   case STATES.FAILED:
    //     return <ErrorFallback />
    //   default:
    //     return <LoadingFallback />
    // }
  }
}

export default Image
