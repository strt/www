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
  default: '16px',
}

const gridGutter = {
  default: '32px',
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
    [`@media ${breakpoints.small}`]: {
      paddingRight: `16px`,
      paddingLeft: `16px`,
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
    [mediaQuery(breakpoints.small)]: {
      width: getWidth(props.sm),
    },
    [mediaQuery(breakpoints.smallDown)]: {
      width: getWidth(props.smDown),
    },
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
  margin: 0 auto;
  grid-row-gap: calc(${gutter.default});
  grid-template-columns:
    [full-start] ${gutter.default} [grid-start] repeat(
      12,
      [col-start] 1fr [col-end]
    )
    [grid-end] ${gutter.default} [full-end];

  @media ${breakpoints.small} {
    grid-gap: calc(${gridGutter.default});
    grid-template-columns:
      [full-start] 0 [grid-start] repeat(12, [col-start] 1fr [col-end])
      [grid-end] 0 [full-end];
  }

  > * {
    grid-column: grid;
  }
`
