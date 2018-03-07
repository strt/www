import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Hero from '../components/Hero'

const SecondPage = () => (
  <Fragment>
    <Helmet />
    <Hero title="Kontakt" />
    <Link to="/">Go to homepage</Link>
  </Fragment>
)

export default SecondPage
