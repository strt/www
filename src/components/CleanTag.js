import React from 'react'

export const defaultBlacklist = [
  'mt',
  'mb',
  'my',
  'pt',
  'pb',
  'py',
  'width',
  'tablet',
  'desktop',
  'justifyContent',
  'alignItems',
  'flexWrap',
  'textAlign',
  'bottomGap',
]

export function omitInvalidProps(props, keys = defaultBlacklist) {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (!keys.includes(key)) {
      acc[key] = value
    }

    return acc
  }, {})
}

export const CleanTag = React.forwardRef(
  ({ as: Component = 'div', blacklist = defaultBlacklist, ...props }, ref) =>
    React.createElement(Component, {
      ref,
      ...omitInvalidProps(props, blacklist),
    }),
)
