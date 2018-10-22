import styled from 'styled-components'
import { space, bgColor } from '../style'

const Div = styled.div(
  (props) => {
    if (props.halfTopBg) {
      return {
        position: 'relative',
        '&::before': {
          content: "''",
          position: 'absolute',
          zIndex: 0,
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: props.halfTopBg,
        },
        '> *': {
          position: 'relative',
        },
      }
    }

    return null
  },
  space,
  bgColor,
)

export default Div
