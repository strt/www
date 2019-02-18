import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  colors,
  fontFamily,
  fluidRange,
  breakpoints,
  vw,
  easings,
} from '../style'

// function getColor(variant, state) {
//   let color

//   if (state === 'hover') {
//   }

//   if (state === 'focus') {
//   }

//   return color
// }

const Link = styled.a`
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  font-size: ${props => props.fontSize || fluidRange({ min: 16, max: 20 })};
  font-family: ${fontFamily};
  font-weight: ${props => (props.thin ? 400 : 500)};
  text-decoration: underline;
  color: ${props => colors[`${props.textColor}500`] || colors.blue500};
  background: none;
  transition: background 200ms ${easings.easeOutQuad};

  @media screen and ${breakpoints.medium} {
    font-size: ${props => props.fontSize || vw(20)};
  }

  &:hover {
    background-color: ${props =>
      colors[`${props.textColor}050`] || colors.blue050};
  }

  &.focus-visible {
    background-color: ${props =>
      colors[`${props.textColor}100`] || colors.blue100};
  }

  &:active,
  &[aria-current] {
    text-decoration: none;
  }
`

Link.propTypes = {
  textColor: PropTypes.oneOf(['blue', 'watermelonRed', 'steel']),
}

export default Link
