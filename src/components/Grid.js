import styled from 'styled-components'
import {
  justifyContent,
  justifyItems,
  alignItems,
  flexWrap,
  order,
  space,
  alignSelf,
  justifySelf,
  breakpoints,
  mediaQuery,
  fluidRange,
  vw,
} from '../style'
import { CleanTag } from './CleanTag'

export function getWidth(value) {
  if (value == null) {
    return null
  }

  if (!Number.isNaN(Number(value))) {
    return `${(100 / 12) * Number(value)}%`
  }

  return value
}

export const Grid = styled(CleanTag)(
  {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: fluidRange({ min: 8, max: 12 }),
    paddingLeft: fluidRange({ min: 8, max: 12 }),
    [`@media ${breakpoints.medium}`]: {
      paddingRight: `${vw(40)}`,
      paddingLeft: `${vw(40)}`,
    },
  },
  space,
  alignItems,
  flexWrap,
  justifyItems,
  justifyContent,
)

export const Column = styled(CleanTag)(
  props => ({
    width: getWidth(props.width) || '100%',
    paddingRight: fluidRange({ min: 8, max: 12 }),
    paddingLeft: fluidRange({ min: 8, max: 12 }),
    marginBottom: props.bottomGap ? fluidRange({ min: 16, max: 24 }) : null,
    [mediaQuery(breakpoints.medium)]: {
      paddingRight: `${vw(16)}`,
      paddingLeft: `${vw(16)}`,
      marginBottom: props.bottomGap ? `${vw(32)}` : null,
      width: getWidth(props.tablet),
    },
    [mediaQuery(breakpoints.large)]: {
      width: getWidth(props.desktop),
    },
  }),
  space,
  order,
  alignSelf,
  justifySelf,
)

export const CssGrid = styled.div`
  display: grid;
  grid-gap: ${fluidRange({ min: 16, max: 24 })};
  grid-template-columns:
    [full-start] 0 [grid-start] repeat(12, [col-start] 1fr [col-end])
    [grid-end] 0 [full-end];

  @media ${breakpoints.medium} {
    grid-gap: ${vw(32)};
    grid-template-columns:
      [full-start] ${vw(24)} [grid-start] repeat(12, [col-start] 1fr [col-end])
      [grid-end] ${vw(24)} [full-end];
  }
`
