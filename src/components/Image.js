import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { noop } from '../utils'
import { easings, cover } from '../style'

const cache = new Set()

function isImageCached(props) {
  if (!props.fluid) return false
  const { src } = props.fluid
  return cache.has(src)
}

function addImageToCache(props) {
  if (props.fluid) {
    cache.add(props.fluid.src)
  }
}

let io
const listeners = new Map()
function getIntersectionObserver(options) {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    'IntersectionObserver' in window
  ) {
    io = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (listeners.has(entry.target)) {
          const cb = listeners.get(entry.target)
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            io.unobserve(entry.target)
            listeners.delete(entry.target)
            cb()
          }
        }
      })
    }, options)
  }

  return io
}

function useIntersectionObserver({ target, onIntersect = noop }) {
  useEffect(() => {
    const observer = getIntersectionObserver({ rootMargin: '200px' })

    if (!observer) {
      onIntersect()
      return null
    }

    observer.observe(target.current)
    listeners.set(target.current, onIntersect)

    return () => {
      observer.unobserve(target.current)
      listeners.delete(target.current)
    }
  }, [])
}

function normalizeProps({ fluid, aspectRatio, sizes, ...props }) {
  if (fluid) {
    return {
      src: fluid.src,
      srcSet: fluid.srcSet,
      sizes: sizes || fluid.sizes,
      aspectRatio: aspectRatio !== 'auto' ? fluid.aspectRatio : undefined,
      base64: fluid.base64,
      ...props,
    }
  }

  return {
    sizes,
    ...props,
  }
}

function LazyImage(props, forwardedRef) {
  const {
    src,
    sizes,
    srcSet,
    alt = '',
    base64,
    aspectRatio,
    critical = false,
    onLoad = noop,
    ...elementProps
  } = normalizeProps(props)

  const imageWrapperRef = useRef()
  const [isVisible, setVisible] = useState(!!critical)
  const [isLoaded, setLoaded] = useState(() => isImageCached(props))

  useIntersectionObserver({
    target: imageWrapperRef,
    onIntersect: () => {
      setVisible(true)
    },
  })

  useEffect(() => {
    if (isLoaded) {
      addImageToCache(props)
    }
  }, [isLoaded])

  return (
    <ImageWrapper
      key={`${JSON.stringify(srcSet)}`}
      ref={imageWrapperRef}
      aspectRatio={aspectRatio}
    >
      {base64 && (
        <PlaceholderImage src={base64} alt="" opacity={isLoaded ? 0 : 1} />
      )}
      {isVisible && (
        <img
          ref={forwardedRef}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          src={src}
          onLoad={(event) => {
            onLoad(event)
            setLoaded(true)
          }}
          {...elementProps}
        />
      )}
      <noscript>
        <img
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          src={src}
          {...elementProps}
          style={{ position: 'relative', zIndex: 3 }}
        />
      </noscript>
    </ImageWrapper>
  )
}

export default React.forwardRef(LazyImage)

export const ImageWrapper = styled.figure`
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: ${props =>
    props.aspectRatio ? `${100 / props.aspectRatio}%` : null};

  img {
    max-width: none;
    width: 100%;
  }
`

export const PlaceholderImage = styled.img`
  ${cover()}
  filter: blur(30px);
  transform: scale(1.2);
  z-index: 2;
  opacity: ${props => props.opacity || 0};
  transition: opacity 400ms ${easings.easeInSine};
  pointer-events: none;
`
