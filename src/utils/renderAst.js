import React from 'react'
import RehypeReact from 'rehype-react'
import { Text, H1, H2 } from '../components/Text'
import { Column } from '../components/Grid'
import Image from '../components/Image'

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
  createElement: React.createElement,
  components: {
    h1: withColumn(H1),
    h2: withColumn(H2),
    p: withColumn(Text),
    'image-component': withColumn(ImageWrapper, { tablet: 12, my: 7 }),
  },
})

export default renderAst
