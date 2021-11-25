import React from 'react'

export const defaultBlacklist = [
  'mt',
  'mb',
  'my',
  'pt',
  'pb',
  'py',
  'width',
  'sm',
  'smDown',
  'md',
  'lg',
  'justifyContent',
  'alignItems',
  'flexWrap',
  'textAlign',
  'bottomGap',
  'topGap',
  'variant',
  'colorVariant',
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
  ({ as: Tag = 'div', blacklist = defaultBlacklist, ...props }, ref) =>
    React.createElement(Tag, {
      ref,
      ...omitInvalidProps(props, blacklist),
    }),
)
