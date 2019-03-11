import React, { useContext } from 'react'
import styled from 'styled-components'
import { IdContext } from './IdManager'
import {
  vw,
  colors,
  fontFamily,
  breakpoints,
  fluidRange,
  easings,
  durations,
} from '../style'

const Label = styled.label`
  font-size: ${fluidRange({ min: 12, max: 16 })};
  line-height: 1.2em;
  color: ${colors.steel500};

  @media ${breakpoints.medium} {
    font-size: ${vw(16)};
  }
`

const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${fluidRange({ min: 24, max: 32 })};

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    pointer-events: none;
    background-color: ${colors.steel500};
    transform-origin: 100% 100%;
    transition: all ${durations.fast} ${easings.easeOutQuad};
  }

  &:focus-within,
  &:hover {
    &::after {
      transform: scale3d(1, 2, 1);
    }
  }

  @media ${breakpoints.medium} {
    margin-bottom: ${vw(32)};
  }

  input,
  textarea {
    border: 0;
    border-radius: 0;
    margin: 0;
    width: 100%;
    padding: ${fluidRange({ min: 4, max: 8 })} 0
      ${fluidRange({ min: 12, max: 16 })};
    outline: none;
    font-family: ${fontFamily};
    font-size: ${fluidRange({ min: 16, max: 22 })};
    line-height: normal;
    color: ${colors.dark};
    box-shadow: none;

    @media ${breakpoints.medium} {
      padding: ${vw(8)} 0 ${vw(16)};
      font-size: ${vw(22)};
    }
  }

  textarea {
    resize: vertical;
    min-height: 2.4em;
  }
`

function TextField({ label, multiline, ...props }, forwardedRef) {
  const getId = useContext(IdContext)
  const id = props.id || getId('textfield')
  const Input = multiline ? 'textarea' : 'input'

  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} ref={forwardedRef} {...props} />
    </Wrapper>
  )
}

export default React.forwardRef(TextField)
