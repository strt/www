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

export default function LazyImage(props) {
  const {
    src,
    sizes,
    srcSet,
    alt = '',
    onLoad = noop,
    base64,
    aspectRatio,
    ...elementProps
  } = normalizeProps(props)

  const imageWrapperRef = useRef()
  const [isCached] = useState(() => isImageCached(props))
  const [isVisible, setVisible] = useState(false)
  const [isLoaded, setLoaded] = useState(false)

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
      aspectRatio={aspectRatio}
      ref={imageWrapperRef}
      key={`${JSON.stringify(srcSet)}`}
    >
      {base64 && (
        <PlaceholderImage
          src={base64}
          alt=""
          fadeIn={isLoaded || (isLoaded && isCached)}
        />
      )}
      {isVisible && (
        <img
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
  opacity: ${props => (props.fadeIn ? 0 : 1)};
  transition: opacity 400ms ${easings.easeInSine};
  pointer-events: none;
`
