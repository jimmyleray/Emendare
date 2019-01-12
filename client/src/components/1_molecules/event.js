import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Notification, StopWatch } from '../../components'
import { path } from '../../config'

const typeToUrl = type => target => {
  const id = target._id ? target._id : ''
  switch (type) {
    case 'amend':
      return path.amend(id)
    case 'text':
      return path.text(id)
    case 'group':
      return path.group(id)
    default:
      return path.home
  }
}

const typeToText = type => target => {
  const created = new Date(target.created)
  switch (type) {
    case 'amend':
      return (
        <>
          <p>
            <Icon type="fas fa-pencil-alt" className="fa-lg has-text-success" />
            <Icon type="fas fa-chevron-right" />
            <span>
              Il y a{' '}
              <StopWatch date={created} className="has-text-weight-semibold" />
            </span>
          </p>

          <p>
            Un{' '}
            <span className="has-text-weight-semibold">nouvel amendement</span>{' '}
            a été proposé sur le texte{' '}
            <span className="has-text-weight-semibold">{target.text.name}</span>{' '}
            dans le groupe{' '}
            <span className="has-text-weight-semibold">
              {target.text.group.name}
            </span>
          </p>
        </>
      )
    case 'text':
      return (
        <>
          <p>
            <Icon type="fas fa-align-center" className="fa-lg has-text-info" />
            <Icon type="fas fa-chevron-right" />
            <span>
              Il y a{' '}
              <StopWatch date={created} className="has-text-weight-semibold" />
            </span>
          </p>

          <p>
            Un nouveau texte{' '}
            <span className="has-text-weight-semibold">{target.name}</span> est
            disponible dans le groupe{' '}
            <span className="has-text-weight-semibold">
              {target.group.name}
            </span>
          </p>
        </>
      )
    case 'group':
      return target.parent ? (
        <>
          <p>
            <Icon type="fas fa-users" className="fa-lg has-text-danger" />
            <Icon type="fas fa-chevron-right" />
            <span>
              Il y a{' '}
              <StopWatch date={created} className="has-text-weight-semibold" />
            </span>
          </p>

          <p>
            Un nouveau groupe{' '}
            <span className="has-text-weight-semibold">{target.name}</span> est
            disponible dans le groupe{' '}
            <span className="has-text-weight-semibold">
              {target.parent.name}
            </span>
          </p>
        </>
      ) : (
        <>
          <p>
            <Icon type="fas fa-users" className="fa-lg has-text-danger" />
            <Icon type="fas fa-chevron-right" />
            <span>
              Il y a{' '}
              <StopWatch date={created} className="has-text-weight-semibold" />
            </span>
          </p>

          <p>
            Un nouveau groupe racine{' '}
            <span className="has-text-weight-semibold">{target.name}</span> est
            disponible
          </p>
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
        <Notification className="is-light">
          {typeToText(data.targetType)(data.target)}
        </Notification>
      </Link>
      <br />
    </>
  )
