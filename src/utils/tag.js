import React from 'react'

const defaultBlacklist = ['textAlign', 'tablet', 'width']

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

export function createTag(Component) {
  return function Element(props) {
    return React.createElement(Tag, { ...props, as: Component })
  }
}
