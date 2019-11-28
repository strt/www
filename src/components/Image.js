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
  }, [onIntersect, target])
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
  density,
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
    opacity: ${props => (props.isLoaded ? 0 : 1)};
    transition: opacity ${durations.slow} ${easings.easeInQuad};
    transition-delay: ${props =>
      props.isLoaded ? durations.slow : durations.normal};
  }

  [data-background] {
    ${cover()}
    z-index: -2;
  }
`

const ColorOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: ${props => props.overlay};
  mix-blend-mode: multiply;
`

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
    overlay = '',
    ...elementProps
  } = normalizeProps(props)

  const imageWrapperRef = useRef(null)
  const [isVisible, setVisible] = useState(!!critical)
  const [isLoaded, setLoaded] = useState(() => isImageCached(props))
  const [hovering, setHovering] = useState(0)

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
  }, [isLoaded, props])

  const handleLoad = useCallback(event => {
    onLoad(event)
    setLoaded(true)
  })

  const noscriptFallback = `
    <img src="${src}" alt="${alt}" />
  `

  return (
    <ImageWrapper
      key={`${JSON.stringify(srcSet)}`}
      ref={imageWrapperRef}
      aspectRatio={aspectRatio}
      isLoaded={isLoaded}
      onMouseOver={() => setHovering(1)}
      onFocus={() => setHovering(1)}
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
      {overlay && hovering && (
        <ColorOverlay
          onMouseOut={() => setHovering()}
          onBlur={() => setHovering()}
          {...props}
        />
      )}
      <noscript dangerouslySetInnerHTML={{ __html: noscriptFallback }} />
    </ImageWrapper>
  )
}

export default React.forwardRef(LazyImage)
