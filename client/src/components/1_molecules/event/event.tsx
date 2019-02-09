import React from 'react'
import {
  DataContext,
  Icon,
  Link,
  Notification,
  StopWatch
} from '../../../components'
import { path } from '../../../config'

const typeToUrl = (type: string) => (target: any) => {
  switch (type) {
    case 'amend':
    case 'result':
      return path.amend(target._id)
    case 'text':
      return path.text(target._id)
    default:
      return path.home
  }
}

const typeToText = (type: string) => (target: any) => {
  switch (type) {
    case 'amend':
      return (
        <p>
          <Icon type="far fa-comment-alt" className="fa-lg has-text-primary" />
          <Icon type="fas fa-chevron-right" />
          <span>
            Il y a{' '}
            <StopWatch
              date={target.created}
              className="has-text-weight-semibold"
            />
          </span>
          {' - '}
          Un nouvel amendement{' '}
          <span className="has-text-weight-semibold">"{target.name}"</span> a
          été proposé
        </p>
      )
    case 'result':
      return (
        <p>
          <Icon
            type={
              'fas ' +
              (target.conflicted
                ? 'fa-minus-circle'
                : target.accepted
                ? 'fa-check-circle'
                : 'fa-times-circle')
            }
            className={
              'fa-lg ' +
              (target.conflicted
                ? 'has-text-dark'
                : target.accepted
                ? 'has-text-success'
                : 'has-text-danger')
            }
          />
          <Icon type="fas fa-chevron-right" />
          <span>
            Il y a{' '}
            <StopWatch
              date={target.finished}
              className="has-text-weight-semibold"
            />
          </span>
          {' - '}
          L'amendement{' '}
          <span className="has-text-weight-semibold">"{target.name}"</span> a
          été{' '}
          {target.conflicted
            ? "refusé à cause d'un conflit technique"
            : target.accepted
            ? 'accepté par les participants'
            : 'refusé par les participants'}
        </p>
      )
    case 'text':
      return (
        <p>
          <Icon type="fas fa-align-center" className="fa-lg has-text-info" />
          <Icon type="fas fa-chevron-right" />
          <span>
            Il y a{' '}
            <StopWatch
              date={target.created}
              className="has-text-weight-semibold"
            />
          </span>
          {' - '}
          Un nouveau texte{' '}
          <span className="has-text-weight-semibold">"{target.name}"</span> a
          été créé
        </p>
      )

    default:
      return <></>
  }
}

export const Event = ({ data }: { data: any }) => (
  <DataContext.Consumer>
    {({ get }) => {
      if (data && data.targetType && data.targetID) {
        const target = get(
          data.targetType === 'result' ? 'amend' : data.targetType
        )(data.targetID)

        return target && target.data ? (
          <>
            <Link to={typeToUrl(data.targetType)(target.data)}>
              <Notification className="is-light">
                {typeToText(data.targetType)(target.data)}
              </Notification>
            </Link>
          </>
        ) : (
          <></>
        )
      }
    }}
  </DataContext.Consumer>
)
