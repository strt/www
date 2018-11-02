import React from 'react'
import RehypeReact from 'rehype-react'
import { Text, H1, H2 } from '../components/Text'

const { Compiler: renderAst } = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    h2: H2,
    p: Text,
  },
})

export default renderAst
