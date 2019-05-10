import React from 'react'

// Components
import { Vote, ResultBar, Icon } from '../../../components'

// Interfaces
import { IUser, IAmend } from '../../../../../interfaces'

// Helpers
import { getPropsAmendDown, getPropsAmendUp } from '../../../helpers'

interface IResultFooterProps {
  /** Related event */
  target: IAmend
  /** user data */
  user: IUser | null
}

export const ResultFooterCard = ({ target, user }: IResultFooterProps) => {
  const propsAccepted = getPropsAmendUp(target.accepted)
  const propsDecline = getPropsAmendDown(!target.accepted)

  return (
    <div className="is-flex">
      <div
        className="card-event__resultbar--size"
        style={{ flex: 1, marginRight: '20px' }}
      >
        <ResultBar
          results={{
            up: target.results.upVotesCount,
            down: target.results.downVotesCount,
            ind: target.results.indVotesCount
          }}
        />
      </div>
      <div>
        {user ? (
          <Vote
            amend={target}
            match={{ params: { id: target._id } }}
            user={user}
            withIcon={true}
            style={{ justifyContent: 'flex-end' }}
          />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <div {...propsAccepted.container}>
                <Icon {...propsAccepted.icon} />
                <span>{target.results.upVotesCount}</span>
              </div>
            </div>
            <div>
              <div {...propsDecline.container}>
                <Icon {...propsDecline.icon} />
                <span>{target.results.downVotesCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
