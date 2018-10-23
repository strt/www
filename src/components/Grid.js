import styled from 'styled-components'
import {
  justifyContent,
  justifyItems,
  alignItems,
  flexWrap,
  order,
  alignSelf,
  justifySelf,
  breakpoints,
  mediaQuery,
} from '../style'
import { Tag } from '../utils/tag'

function getWidth(value) {
  if (value == null) {
    return null
  }

  if (!Number.isNaN(Number(value))) {
    return `${(100 / 12) * Number(value)}%`
  }

  return value
}

export const Grid = styled.div(
  {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: `${40 / 15.2}vw`,
    paddingLeft: `${40 / 15.2}vw`,
  },
  alignItems,
  flexWrap,
  justifyItems,
  justifyContent,
)

export const Column = styled(Tag)(
  props => ({
    width: getWidth(props.width) || '100%',
    paddingRight: `${16 / 15.2}vw`,
    paddingLeft: `${16 / 15.2}vw`,
    [mediaQuery(breakpoints.medium)]: {
      width: getWidth(props.tablet),
    },
    [mediaQuery(breakpoints.large)]: {
      width: getWidth(props.desktop),
    },
  }),
  order,
  alignSelf,
  justifySelf,
)
