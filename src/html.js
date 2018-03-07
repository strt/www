import React from 'react'
import PropTypes from 'prop-types'

let stylesStr
if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require('!raw-loader!../public/styles.css')
  } catch (e) {
    console.log(e)
  }
}

const Html = (props) => {
  let css
  if (process.env.NODE_ENV === 'production') {
    css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />
  }

  return (
    <html lang="sv">
      <head>
        <meta charSet="utf-8" />
        <meta name="referrer" content="origin" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {props.headComponents}
        {css}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

Html.propTypes = {
  headComponents: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  postBodyComponents: PropTypes.node.isRequired,
}

module.exports = Html
