import NProgress from 'nprogress'

const defaultOptions = {}

export const onClientEntry = (a, pluginOptions = {}) => {
  const options = { ...defaultOptions, ...pluginOptions }

  NProgress.configure(options)
}

export const onRouteUpdateDelayed = () => {
  NProgress.start()
}

export const onRouteUpdate = () => {
  NProgress.done()
}
