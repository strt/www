exports.onRouteUpdate = ({ location }) => {
  if (process.env.NODE_ENV === 'production' && typeof _hsq === 'object') {
    // eslint-disable-next-line no-underscore-dangle,no-multi-assign
    const _hsq = (window._hsq = window._hsq || [])
    _hsq.push([
      'setPath',
      location
        ? location.pathname + location.search + location.hash
        : undefined,
    ])
    _hsq.push(['trackPageView'])
  }
}
