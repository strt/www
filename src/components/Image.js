import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { easings, cover, durations } from '../style'

const cache = new Set()

function noop() {}

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
    io = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
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

    if (observer) {
      observer.observe(target.current)
      listeners.set(target.current, onIntersect)

      return () => {
        observer.unobserve(target.current)
        listeners.delete(target.current)
      }
    }

    onIntersect()
    return undefined
  }, [])
}

function normalizeProps({
  fluid,
  aspectRatio,
  sizes,
  srcSetType,
  originalImg,
  originalName,
  presentationWidth,
  presentationHeight,
  ...props
}) {
  if (fluid) {
    return {
      src: fluid.src,
      srcSet: fluid.srcSet,
      sizes: sizes || fluid.sizes,
      aspectRatio: aspectRatio !== 'auto' ? fluid.aspectRatio : undefined,
      base64: fluid.base64,
      srcSetWebp: fluid.srcSetWebp,
      ...props,
    }
  }

  return {
    sizes,
    aspectRatio,
    ...props,
  }
}

function LazyImage(props, forwardedRef) {
  const {
    as: Img = 'img',
    src,
    sizes,
    srcSet,
    srcSetWebp,
    alt = '',
    base64,
    bg,
    aspectRatio,
    critical = false,
    onLoad = noop,
    children,
    ...elementProps
  } = normalizeProps(props)

  const imageWrapperRef = useRef(null)
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

  const handleLoad = useCallback(event => {
    onLoad(event)
    setLoaded(true)
  })

  return (
    <ImageWrapper
      key={`${JSON.stringify(srcSet)}`}
      ref={imageWrapperRef}
      aspectRatio={aspectRatio}
      isLoaded={isLoaded}
    >
      {base64 && <img src={base64} alt="" data-placeholder />}
      {bg && <div style={{ background: bg }} data-background />}
      {isVisible && (
        <picture>
          {srcSetWebp && (
            <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
          )}

          <Img
            ref={forwardedRef}
            alt={alt}
            srcSet={srcSet}
            sizes={sizes}
            src={src}
            onLoad={handleLoad}
            data-image
            decoding="async"
            {...elementProps}
          />
        </picture>
      )}
    </ImageWrapper>
  )
}

export default React.forwardRef(LazyImage)

export const ImageWrapper = styled.figure`
  position: relative;
  z-index: 0;
  overflow: hidden;
  height: ${props => (props.aspectRatio ? 0 : null)};
  padding-bottom: ${props =>
    props.aspectRatio ? `${100 / props.aspectRatio}%` : null};

  img {
    max-width: none;
    width: 100%;
  }

  [data-image] {
    opacity: ${props => (props.isLoaded ? 1 : 0)};
    transition: opacity ${durations.slow} ${easings.easeInQuad};
  }

  [data-placeholder] {
    ${cover()}
    z-index: -1;
    transform: scale(1.1);
    /* filter: blur(30px); */
  }

  [data-background] {
    ${cover()}
    z-index: -2;
  }
`
