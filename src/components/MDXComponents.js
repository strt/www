import React from 'react'
import { H1, H2, H3, Text } from './Text'
import Link from './Link'
import { Column } from './Grid'

const components = {
  wrapper: React.Fragment,
  h1: H1,
  h2: H2,
  h3: H3,
  p: Text,
  column: Column,
  a: Link,
}

export default components
