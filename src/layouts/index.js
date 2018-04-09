import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import 'reset-css/reset.css'
import '../styles/main.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'

const TemplateWrapper = ({ children }) => (
  <Fragment>
    <Helmet titleTemplate="%s – Strateg">
      {/* TODO: Remove before release */}
      <meta name="robots" content="noindex" />
      <meta
        name="description"
        content="Välkommen till Strateg! Här finns fler än 40 strateger med en väldig massa kompetens och ett ovanligt stort engagemang."
      />
    </Helmet>
    <Header />
    <main>{children()}</main>
    <Footer />
  </Fragment>
)

export default TemplateWrapper
