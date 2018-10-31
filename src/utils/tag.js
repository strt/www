import React from 'react'

const defaultBlacklist = ['textAlign', 'width']

export function omit(obj, keys) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keys.includes(key)) {
      acc[key] = value
    }

    return acc
  }, {})
}

export const Tag = React.forwardRef(
  ({ as: Component = 'div', blacklist = defaultBlacklist, ...props }, ref) =>
    React.createElement(Component, {
      ref,
      ...omit(props, blacklist),
    }),
)
