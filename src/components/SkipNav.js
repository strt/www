import React from 'react'
import styled from 'styled-components'

const StyledSkipNavLink = styled.a`
  position: absolute;
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  width: 1px;
  padding: 0;
  overflow: hidden;

  &:focus {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1;
    padding: 1rem;
    width: auto;
    height: auto;
    background: white;
    clip: auto;
  }
`

export default function SkipNavLink({
  children = 'Till huvudinnehållet',
  id = 'main-content',
}) {
  return <StyledSkipNavLink href={`#${id}`}>{children}</StyledSkipNavLink>
}
