import React from 'react'
import styled from 'styled-components'
import { noop } from '../utils'
import { easings, cover } from '../style'

const cache = new Map()
function isInCache(props) {
  if (!props.fluid) return false
  const { src } = props.fluid
  if (cache.has(src)) {
    return true
  }
  cache.set(src, true)
  return false
}

let io
const listeners = []
function getIntersectionObserver() {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    window.IntersectionObserver
  ) {
    io = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          listeners.forEach(([element, cb]) => {
            if (element === entry.target) {
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                io.unobserve(element)
                cb()
              }
            }
          })
        })
      },
      { rootMargin: `200px` },
    )
  }

  return io
}

function observeIntersections(el, cb) {
  getIntersectionObserver().observe(el)
  listeners.push([el, cb])
}

function normalizeProps({ fluid: image, sizes, ...props }) {
  if (image) {
    return {
      src: image.src,
      srcSet: image.srcSet,
      sizes: sizes || image.sizes,
      aspectRatio: image.aspectRatio,
      base64: image.base64,
      ...props,
    }
  }

  return {
    sizes,
    ...props,
  }
}

export const ImageWrapper = styled.figure`
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: ${props => `${100 / (props.aspectRatio || 2)}%`};

  img {
    max-width: auto;
    width: 100%;
  }
`

export const PlaceholderImage = styled.img`
  ${cover()}
  filter: blur(30px);
  transform: scale(1.2);
  z-index: 2;
  transition: opacity 400ms ${easings.easeInSine};
`

class Image extends React.Component {
  static defaultProps = {
    onLoad: noop,
  }

  state = {
    isVisible: false,
    isLoaded: false,
    isSeenBefore: isInCache(this.props),
  }

  onLoad = () => {
    this.setState({ isLoaded: true })
    this.props.onLoad()
  }

  handleRef = (node) => {
    if (node) {
      observeIntersections(node, () => {
        this.setState({ isVisible: true })
      })
    }
  }

  render() {
    const { isVisible, isLoaded, isSeenBefore } = this.state
    const {
      src,
      sizes,
      srcSet,
      alt = '',
      onLoad,
      base64,
      aspectRatio,
      ...props
    } = normalizeProps(this.props)

    return (
      <ImageWrapper
        aspectRatio={aspectRatio}
        ref={this.handleRef}
        key={`${JSON.stringify(srcSet)}`}
      >
        {base64 && (
          <PlaceholderImage
            src={base64}
            alt=""
            css={{ opacity: !isLoaded && !isSeenBefore ? 1 : 0 }}
          />
        )}
        {isVisible && (
          <img
            alt={alt}
            srcSet={srcSet}
            sizes={sizes}
            src={src}
            onLoad={this.onLoad}
            {...props}
          />
        )}
      </ImageWrapper>
    )
  }
}

export default Image
