import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import { colors, fluidRange, breakpoints, vw, fontFamily } from '../style'

export const BtnReset = styled.button`
  display: inline-block;
  border: none;
  text-align: center;
  text-decoration: none;
  line-height: normal;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const StyledButton = styled.button`
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  border: none;
  border-radius: 0;
  padding: ${fluidRange({ min: 18, max: 24 })};
  font-size: ${fluidRange({ min: 18, max: 24 })};
  font-weight: 400;
  color: white;
  font-family: ${fontFamily};
  background-color: ${colors.dark};
  box-shadow: none;
  appearance: none;

  @media ${breakpoints.medium} {
    padding: ${vw(24)};
    font-size: ${vw(24)};
  }
`

export const ButtonInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function Button(props) {
  return <StyledButton {...props} />
}

export const IconButton = styled.button`
  appearance: none;
  padding: 0;
  margin: 0;
  border: none;
  font-size: ${fluidRange({ min: 20, max: 26 })};
  line-height: 0.625em;
  color: ${props => props.textColor || colors.dark};
  background: none;

  @media ${breakpoints.medium} {
    font-size: ${vw(32)};
  }

  &:focus {
    outline: none;
  }
`

export const IconArrow = styled.button`
  appearance: none;
  padding: 0;
  margin: 0;
  border: none;
  font-size: 3rem;
  line-height: 0.625em;
  color: ${props => props.textColor || colors.dark};
  background: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

export function ScrollToTopButton(props) {
  return (
    <IconArrow
      aria-label="Skrolla till toppen"
      onClick={event => {
        event.preventDefault()
        window.scroll({
          top: 0,
          behavior: 'smooth',
        })
      }}
      {...props}
    >
      <Icon name={['fal', 'long-arrow-up']} />
    </IconArrow>
  )
}
