import React from 'react'
import { H1, H2, Text } from './Text'
import Link from './Link'
import { Column } from './Grid'
import Image from './Image'
import EmbedPlayer from './EmbedPlayer'

function withColumn(WrappedComponent, { tablet = 8, ...rest } = {}) {
  function Component(props) {
    return (
      <Column tablet={tablet} {...rest}>
        <WrappedComponent {...props} />
      </Column>
    )
  }

  Component.displayName = `withColumn(${WrappedComponent.displayName})`

  return Component
}

function ImageWrapper(props) {
  let fluid
  try {
    fluid = JSON.parse(props.fluid)
  } catch (e) {
    // silently fail
  }
  return <Image fluid={fluid} />
}

const components = {
  wrapper: React.Fragment,
  h1: H1,
  h2: H2,
  p: Text,
  column: Column,
  a: Link,
  'image-component': withColumn(ImageWrapper, { tablet: 12, my: 7 }),
  iframe: withColumn(EmbedPlayer, { tablet: 12, my: 7 }),
}

export default components
