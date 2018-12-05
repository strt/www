import React from 'react'
import styled from 'styled-components'
import { noop } from '../utils'
import { easings, cover } from '../style'

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

function isImageCached(props) {
  if (typeof window === `undefined`) return false
  const { src } = normalizeProps(props)
  const image = new Image()
  image.src = src

  return image.complete
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

class LazyImage extends React.Component {
  static defaultProps = {
    onLoad: noop,
  }

  state = {
    isVisible: false,
    isLoaded: false,
    isCached: isImageCached(this.props),
  }

  wrapperRef = React.createRef()

  componentDidMount() {
    const { current: node } = this.wrapperRef

    if (node) {
      observeIntersections(node, () => {
        this.setState({ isVisible: true })
      })
    }
  }

  componentWillUnmount() {
    listeners.delete(this.wrapperRef.current)
  }

  onLoad = () => {
    this.setState({ isLoaded: true })
    this.props.onLoad()
  }

  render() {
    const { isVisible, isLoaded, isCached } = this.state
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
        ref={this.wrapperRef}
        key={`${JSON.stringify(srcSet)}`}
      >
        {base64 && (
          <PlaceholderImage
            src={base64}
            alt=""
            css={{ opacity: !isLoaded && !isCached ? 1 : 0 }}
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
        <noscript>
          <img
            alt={alt}
            srcSet={srcSet}
            sizes={sizes}
            src={src}
            {...props}
            style={{ position: 'relative', zIndex: 3 }}
          />
        </noscript>
      </ImageWrapper>
    )
  }
}

export default LazyImage
