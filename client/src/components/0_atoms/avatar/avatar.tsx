import React from 'react'
import { Link, Icon } from '../../../components'

interface IAvatarProps {
  /** Url link when click */
  link: string
  /** Url display image */
  imgUrl: string
  /** Name to display */
  name: string
}

export const Avatar = React.memo(({ link, imgUrl, name }: IAvatarProps) => (
  <Link to={link}>
    <figure className="image is-128x128" style={{ margin: 'auto' }}>
      <img alt="avatar" src={imgUrl} className="is-rounded" />
    </figure>
    <p>
      <Icon style={{ marginRight: 8 }} type={'brands'} name={'fa-github'} />
      <span id="name">{name}</span>
    </p>
  </Link>
))
