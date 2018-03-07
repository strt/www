import React from 'react'
import Link from 'gatsby-link'
import style from './nav.module.scss'

const Nav = () => (
  <nav className={style.root}>
    <ul className={style.list}>
      <li className={style.item}>
        <Link to="/vad-vi-gor/" className={style.link} activeClassName="active">
          Vad vi gör
        </Link>
      </li>
      <li className={style.item}>
        <Link to="/case/" className={style.link} activeClassName="active">
          Case
        </Link>
      </li>
      <li className={style.item}>
        <Link to="/bli-en-av-oss/" className={style.link} activeClassName="active">
          Bli en av oss
        </Link>
      </li>
      <li className={style.item}>
        <Link to="/kontakt/" className={style.link} activeClassName="active">
          Kontakt
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
