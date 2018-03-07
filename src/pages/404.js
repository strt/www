import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Hero from '../components/Hero'

const NotFoundPage = () => (
  <Fragment>
    <Helmet title="404" />
    <Hero title="404 – Sidan hittades inte" />
  </Fragment>
)

export default NotFoundPage
