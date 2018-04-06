import React from 'react'
import classNames from 'classnames'
import style from './hero.module.scss'

const Hero = ({
  className, title, excerpt, image, video, ...rest
}) => (
  <div className={classNames(style.root, className)} {...rest}>
    {image && !video && <img src={image} alt="" className={style.background} />}

    {video && (
      <video loop muted autoPlay className={style.background} poster={image || ''}>
        {video.sources.map(source => (
          <source key={source.type} src={source.url} type={source.type} />
        ))}
        <source />
      </video>
    )}

    <div className="grid -pad -center">
      <div className="grid__column -desktop-7">
        <h1 className={style.title}>{title}</h1>
        {excerpt && <p className={style.excerpt}>{excerpt}</p>}
      </div>
    </div>
  </div>
)

export default Hero
