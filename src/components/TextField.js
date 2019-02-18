import React from 'react'
import styled from 'styled-components'
import { vw, colors, fontFamily, breakpoints, fluidRange } from '../style'

const Input = styled.input`
  border: 0;
  border-radius: 0;
  margin: 0;
  width: 100%;
  padding: ${fluidRange({ min: 4, max: 8 })} 0
    ${fluidRange({ min: 12, max: 16 })};
  border-bottom: solid 1px ${colors.steel500};
  font-family: ${fontFamily};
  font-size: ${fluidRange({ min: 16, max: 22 })};
  line-height: normal;
  color: ${colors.dark};
  box-shadow: 0;

  @media ${breakpoints.medium} {
    padding: ${vw(8)} 0 ${vw(16)};
    font-size: ${vw(22)};
  }
`

const Label = styled.label`
  font-size: ${fluidRange({ min: 12, max: 16 })};
  line-height: 1.2em;
  color: ${colors.steel500};

  @media ${breakpoints.medium} {
    font-size: ${vw(16)};
  }
`

const Wrapper = styled.div`
  margin-bottom: ${fluidRange({ min: 24, max: 32 })};

  @media ${breakpoints.medium} {
    margin-bottom: ${vw(32)};
  }
`

function TextField({ label, ...props }, forwardedRef) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input ref={forwardedRef} {...props} />
    </Wrapper>
  )
}

export default React.forwardRef(TextField)
