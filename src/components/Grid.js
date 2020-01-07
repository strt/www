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

const gutter = {
  default: '15px',
}

export const Grid = styled(CleanTag)(
  {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: fluidRange({ min: 8, max: 12 }),
    paddingLeft: fluidRange({ min: 8, max: 12 }),
    width: '100%',
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

export function getColumnMargin() {
  return {
    marginBottom: gutter.default,
    marginTop: gutter.default,
  }
}

export const Column = styled(CleanTag)(
  props => ({
    width: getWidth(props.width) || '100%',
    paddingRight: gutter.default,
    paddingLeft: gutter.default,
    [mediaQuery(breakpoints.medium)]: {
      width: getWidth(props.md),
    },
    [mediaQuery(breakpoints.large)]: {
      width: getWidth(props.lg),
    },
  }),
  getColumnMargin,
  space,
  order,
  alignSelf,
  justifySelf,
)

/**
 * CssGrid is used on frontpage
 */
export const CssGrid = styled.div`
  display: grid;
  grid-gap: calc(${gutter.default});
  grid-template-columns:
    [full-start] ${gutter.default} [grid-start] repeat(
      12,
      [col-start] 1fr [col-end]
    )
    [grid-end] ${gutter.default} [full-end];

  @media ${breakpoints.medium} {
    grid-gap: calc(${gutter.default});
    grid-template-columns:
      [full-start] calc(${vw(24)} + ${gutter.default}) [grid-start] repeat(
        12,
        [col-start] 1fr [col-end]
      )
      [grid-end] calc(${vw(24)} + ${gutter.default}) [full-end];
  }

  > * {
    grid-column: grid;
  }
`
