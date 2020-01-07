import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import useIntersectionObserver from '../lib/useIntersectionObserver'
import { ratio, cover } from '../style'

const Wrapper = styled.div`
  ${props =>
    ratio(
      props.aspectRatio
        ? { x: props.aspectRatio[0], y: props.aspectRatio[1] }
        : undefined,
    )}

  video {
    ${cover()}
  }
`

export default function Video({ src, ...props }) {
  const ref = useRef(null)
  const [intersection] = useIntersectionObserver(ref)
  let aspectRatio

  if (props.aspect)
    aspectRatio = props.aspect.includes(':')
      ? props.aspect.split(':')
      : props.aspect

  useEffect(() => {
    if (intersection) {
      if (intersection.isIntersecting) {
        ref.current.play()
      } else {
        ref.current.pause()
      }
    }
  }, [intersection])

  return (
    <Wrapper aspectRatio={aspectRatio}>
      <video ref={ref} src={src} muted playsInline autoPlay loop {...props} />
    </Wrapper>
  )
}
