import React from 'react'
import { Link } from 'react-router-dom'

const typeToUrl = type => target => {
  const id = target._id ? target._id : ''
  switch (type) {
    case 'amend':
      return '/amendement/' + id
    case 'text':
      return '/texte/' + id
    case 'group':
      return '/groupe/' + id
    default:
      return '/'
  }
}

const typeToClass = type => {
  const base = 'notification is-size-5 '
  switch (type) {
    case 'amend':
      return base + 'is-info'
    case 'text':
      return base + 'is-warning'
    case 'group':
      return base + 'is-danger'
    default:
      return ''
  }
}

const typeToText = type => target => {
  switch (type) {
    case 'amend':
      return (
        <>
          Un <span className="has-text-weight-semibold">nouvel amendement</span>{' '}
          a été proposé sur le texte{' '}
          <span className="has-text-weight-semibold">{target.text.name}</span>{' '}
          dans le groupe{' '}
          <span className="has-text-weight-semibold">
            {target.text.group.name}
          </span>
        </>
      )
    case 'text':
      return (
        <>
          Un nouveau texte{' '}
          <span className="has-text-weight-semibold">{target.name}</span> est
          disponible dans le groupe{' '}
          <span className="has-text-weight-semibold">{target.group.name}</span>
        </>
      )
    case 'group':
      return target.parent ? (
        <>
          Un nouveau groupe{' '}
          <span className="has-text-weight-semibold">{target.name}</span> est
          disponible dans le groupe{' '}
          <span className="has-text-weight-semibold">{target.parent.name}</span>
        </>
      ) : (
        <>
          Un nouveau groupe racine{' '}
          <span className="has-text-weight-semibold">{target.name}</span> est
          disponible
        </>
      )

    default:
      return <></>
  }
}

export const Event = ({ data }) =>
  data.targetType &&
  data.target && (
    <>
      <Link to={typeToUrl(data.targetType)(data.target)}>
        <div className={typeToClass(data.targetType)}>
          {typeToText(data.targetType)(data.target)}
        </div>
      </Link>
      <br />
    </>
  )
