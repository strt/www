import React from 'react'
import styled from 'styled-components'
import { noop } from '../utils'
import { easings, cover } from '../style'

const cache = new Set()
function isInCache(props) {
  if (!props.fluid) return false
  const { src } = props.fluid
  if (cache.has(src)) {
    return true
  }
  cache.add(src)
  return false
}

let io
const listeners = new Map()
function getIntersectionObserver() {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    'IntersectionObserver' in window
  ) {
    io = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          listeners.forEach((cb, element) => {
            if (
              element === entry.target &&
              (entry.isIntersecting || entry.intersectionRatio > 0)
            ) {
              io.unobserve(element)
              listeners.delete(element)
              cb()
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
  const observer = getIntersectionObserver()

  if (observer) {
    getIntersectionObserver().observe(el)
    listeners.set(el, cb)
  } else {
    cb()
  }
}

function normalizeProps({ fluid: image, aspectRatio, sizes, ...props }) {
  if (image) {
    return {
      src: image.src,
      srcSet: image.srcSet,
      sizes: sizes || image.sizes,
      aspectRatio: aspectRatio !== 'auto' ? image.aspectRatio : undefined,
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
  padding-bottom: ${props =>
    props.aspectRatio ? `${100 / props.aspectRatio}%` : null};

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

  imageRef = React.createRef()

  componentDidMount() {
    const { current: node } = this.imageRef

    if (node) {
      observeIntersections(node, () => {
        this.setState({ isVisible: true })
      })
    }
  }

  componentWillUnmount() {
    listeners.delete(this.imageRef.current)
  }

  onLoad = () => {
    this.setState({ isLoaded: true })
    this.props.onLoad()
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
        ref={this.imageRef}
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
