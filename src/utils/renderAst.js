import React from 'react'
import RehypeReact from 'rehype-react'
import { Text, H1, H2 } from '../components/Text'
import { Column } from '../components/Grid'

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

const { Compiler: renderAst } = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: withColumn(H1),
    h2: withColumn(H2),
    p: withColumn(Text),
    img: withColumn('img', { tablet: 12, mb: 5 }),
  },
})

export default renderAst
