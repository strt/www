const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const { trackingId, respectDNT } = pluginOptions

  if (trackingId === undefined) {
    console.error('No HubSpot tracking code provided.')
  }

  const html = {
    __html: `
        var _hsq = window._hsq = window._hsq || [];
        _hsq.push(['setPath', window.location.pathname + window.location.search + window.location.hash]);
        ${
          respectDNT === true
            ? `if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external) {
            if (window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || window.external.msTrackingProtectionEnabled()) {
              _hsq.push(['doNotTrack']);
            }
        }`
            : ``
        }
      `,
  }

  setPostBodyComponents([
    <script
      key="gatsby-plugin-hubspot"
      src={`//js.hs-scripts.com/${trackingId}.js`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={html}
    />,
  ])
}
