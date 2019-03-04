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

const gapMapFluid = {
  small: 24,
  standard: 32,
  large: 56,
}

const gapMapFluidRange = {
  small: { min: 16, max: 24 },
  standard: { min: 16, max: 24 },
  large: { min: 24, max: 40 },
}

function getGap(dir, props, cb, map) {
  const gap =
    props[`${dir}Gap`] != null ? props[`${dir}Gap`] : props.theme[`${dir}Gap`]
  return gap ? cb(map[gap] || map.standard) : null
}

export const Column = styled(CleanTag)(
  props => ({
    width: getWidth(props.width) || '100%',
    paddingRight: fluidRange({ min: 8, max: 12 }),
    paddingLeft: fluidRange({ min: 8, max: 12 }),
    marginBottom: getGap('bottom', props, fluidRange, gapMapFluidRange),
    marginTop: getGap('top', props, fluidRange, gapMapFluidRange),
    [mediaQuery(breakpoints.medium)]: {
      paddingRight: `${vw(16)}`,
      paddingLeft: `${vw(16)}`,
      marginBottom: getGap('bottom', props, vw, gapMapFluid),
      marginTop: getGap('top', props, vw, gapMapFluid),
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

  > * {
    grid-column: grid;
  }
`
