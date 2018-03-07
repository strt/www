import React from 'react'
import Link from 'gatsby-link'
import Nav from '../Nav'
import Logo from '../common/Logo'
import style from './header.module.scss'

const Header = () => (
  <header className={style.root}>
    <Link to="/" className={style.logo}>
      <Logo />
    </Link>
    <Nav />
  </header>
)

export default Header
