import React from 'react'
import Link from 'gatsby-link'
import style from './card.module.scss'

const Card = ({
  title, subtitle, link, image, ...rest
}) => (
  <Link to={link} className={style.root} {...rest}>
    <img src={image} alt="" className={style.background} />
    <span className={style.overlay} />
    <div className={style.content}>
      <h6 className={style.subtitle}>{subtitle}</h6>
      <h3 className={style.title}>{title}</h3>
    </div>
  </Link>
)

export default Card
