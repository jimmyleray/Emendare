import React from 'react'
import { DataContext, Icon, Link, Notification, StopWatch } from '..'
import { path } from '../../config'

const typeToUrl = (type: string) => target => {
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
        <p>
          <Icon type="fas fa-pencil-alt" className="fa-lg has-text-primary" />
          <Icon type="fas fa-chevron-right" />
          <span>
            Il y a{' '}
            <StopWatch date={created} className="has-text-weight-semibold" />
          </span>
          {' - '}
          Un <span className="has-text-weight-semibold">
            nouvel amendement
          </span>{' '}
          a été proposé
        </p>
      )
    case 'text':
      return (
        <p>
          <Icon type="fas fa-align-center" className="fa-lg has-text-info" />
          <Icon type="fas fa-chevron-right" />
          <span>
            Il y a{' '}
            <StopWatch date={created} className="has-text-weight-semibold" />
          </span>
          {' - '}
          Un nouveau texte{' '}
          <span className="has-text-weight-semibold">{target.name}</span> a été
          crée
        </p>
      )
    case 'group':
      return (
        <p>
          <Icon type="fas fa-users" className="fa-lg has-text-danger" />
          <Icon type="fas fa-chevron-right" />
          <span>
            Il y a{' '}
            <StopWatch date={created} className="has-text-weight-semibold" />
          </span>
          {' - '}
          Un nouveau groupe{' '}
          <span className="has-text-weight-semibold">{target.name}</span> a été
          crée
        </p>
      )

    default:
      return <></>
  }
}

export const Event = ({ data }) => (
  <DataContext.Consumer>
    {({ get }) => {
      if (data.targetType && data.targetID) {
        const target = get(data.targetType)(data.targetID)

        return target && target.data ? (
          <>
            <Link to={typeToUrl(data.targetType)(target.data)}>
              <Notification className="is-light">
                {typeToText(data.targetType)(target.data)}
              </Notification>
            </Link>
            <br />
          </>
        ) : (
          <></>
        )
      }
    }}
  </DataContext.Consumer>
)
