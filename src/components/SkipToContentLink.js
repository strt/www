import React from 'react'
import styled from 'styled-components'
import Link from './Link'

const StyledLink = styled(Link)`
  position: absolute;
  display: inline-block;
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  width: 1px;
  padding: 0;
  overflow: hidden;
  line-height: 1.4em;
  transition: none;

  &:focus {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1;
    margin: 0;
    width: auto;
    height: auto;
    clip: auto;
  }
`

export default function SkipToContentLink({
  children = 'Till huvudinnehållet',
  id = 'main-content',
}) {
  return <StyledLink href={`#${id}`}>{children}</StyledLink>
}