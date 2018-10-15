import styled from 'styled-components'
import {
  justifyContent,
  justifyItems,
  alignItems,
  flexWrap,
  order,
  breakpoints,
  getWidth,
  createMediaQuery,
} from '../style'
import { Tag } from '../utils/tag'

export const Grid = styled.div(
  {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '4vw',
    paddingLeft: '4vw',
  },
  alignItems,
  flexWrap,
  justifyItems,
  justifyContent,
)

export const Column = styled(Tag)(
  props => ({
    width: getWidth(props.width) || '100%',
    [createMediaQuery(breakpoints.medium)]: {
      width: getWidth(props.tablet),
    },
    [createMediaQuery(breakpoints.large)]: {
      width: getWidth(props.desktop),
    },
  }),
  order,
)
