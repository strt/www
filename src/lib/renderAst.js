import React from 'react'
import RehypeReact from 'rehype-react'
import { Text, H1, H2 } from '../components/Text'
import { Column } from '../components/Grid'
import Image from '../components/Image'
import Link from '../components/Link'
import EmbedPLayer from '../components/EmbedPlayer'

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

const { Compiler: renderAst } = new RehypeReact({
  // Remove wrapping div element
  createElement: (component, props = {}, children = []) => {
    if (component === 'div') {
      return <>{children}</>
    }

    return React.createElement(component, props, children)
  },
  components: {
    h1: withColumn(H1),
    h2: withColumn(H2),
    p: withColumn(Text),
    a: Link,
    'image-component': withColumn(ImageWrapper, { tablet: 12, mb: 7, mt: 2 }),
    iframe: withColumn(EmbedPLayer, { tablet: 12, mb: 7, mt: 2 }),
  },
})

export default renderAst
