import { H1, H2, H3, Text } from './Text'
import Link from './Link'
import { Column } from './Grid'
import Image from './Image'
import EmbedPlayer from './EmbedPlayer'
import Box from './Box'
import Video from './Video'
import { UnorderedList, OrderedList } from './List'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Text,
  a: Link,
  ul: UnorderedList,
  ol: OrderedList,
  Column,
  column: Column,
  Image,
  image: Image,
  Box,
  Video,
  EmbedPlayer,
}

export default components
