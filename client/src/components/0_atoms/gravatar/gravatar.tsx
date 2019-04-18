import React from 'react'
import md5 from 'blueimp-md5'
import { Link, I18nContext } from '../../../components'

interface IGravatarProps {
  /** User email */
  email: string
}

export const Gravatar = React.memo(({ email }: IGravatarProps) => {
  const { actualLanguage } = React.useContext(I18nContext)
  const size = 64
  const hash = md5(email.trim().toLowerCase())
  const url = `https://www.gravatar.com/avatar/${hash}?s=${size}`
  return (
    <Link to={`https://${String(actualLanguage).toLowerCase()}.gravatar.com/`}>
      <figure
        className="image is-64x64"
        style={{
          margin: 'auto',
          borderRadius: '50%',
          boxShadow: '0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)'
        }}
      >
        <img alt="avatar" src={url} className="is-rounded" />
      </figure>
    </Link>
  )
})
