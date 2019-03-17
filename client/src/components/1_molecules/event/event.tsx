import React from 'react'
import { DataContext, Icon, Link, Box, StopWatch } from '../../../components'
import { path } from '../../../config'
import { IEvent } from '../../../../../interfaces'

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
      return null
  }
}

interface IEventProps {
  /** Event object  */
  data: IEvent
}

export const Event = ({ data }: IEventProps) => (
  <DataContext.Consumer>
    {({ get }) => {
      if (data && data.target.type && data.target.id) {
        const target = get(
          data.target.type === 'result' ? 'amend' : data.target.type
        )(data.target.id)

        return target && target.data ? (
          <React.Fragment>
            <Link
              to={typeToUrl(data.target.type)(target.data)}
              className="has-text-dark"
            >
              {typeToText(data.target.type)(target.data)}
            </Link>
          </React.Fragment>
        ) : null
      }
    }}
  </DataContext.Consumer>
)
