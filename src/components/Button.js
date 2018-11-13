import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import { colors, fluidRange, breakpoints } from '../style'

export default function Button() {
  return null
}

export const IconButton = styled.button`
  appearance: none;
  padding: 0;
  margin: 0;
  border: none;
  font-size: ${fluidRange({ min: 20, max: 26 })};
  line-height: 1em;
  color: ${props => props.textColor || colors.dark};
  background: none;

  @media ${breakpoints.medium} {
    font-size: ${32 / 15.2}vw;
  }

  &:focus {
    outline: none;
  }
`

export function ScrollToTopButton(props) {
  return (
    <IconButton
      aria-label="Skrolla till toppen"
      onClick={(event) => {
        event.preventDefault()
        window.scroll({
          top: 0,
          behavior: 'smooth',
        })
      }}
      {...props}
    >
      <Icon name={['fal', 'long-arrow-up']} />
    </IconButton>
  )
}
