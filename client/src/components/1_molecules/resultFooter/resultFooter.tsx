import React from 'react'

// Components
import { Vote, ResultBar, Icon } from '../../../components'

// Interfaces
import { IUser, IAmend } from '../../../../../interfaces'

interface IResultFooterProps {
  /** Related event */
  target: IAmend
  /** user data */
  user: IUser | null
}

export const ResultFooterCard = ({ target, user }: IResultFooterProps) => (
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
      <Vote
        amend={target}
        match={{ params: { id: target._id } }}
        user={user}
        withIcon={true}
        style={{ justifyContent: 'flex-end' }}
      />
    </div>
  </div>
)
