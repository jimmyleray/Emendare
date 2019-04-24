import React from 'react'

// Components
import { Vote, ResultBar } from '../../../components'

// Interfaces
import { IUser, IAmend } from '../../../../../interfaces'

interface IResultFooterProps {
  /** Related event */
  target: IAmend
  /** user data */
  user: IUser | null
  measure: any
  /** Index of the card */
  index: number
}

export const ResultFooterCard = ({ target, user }: IResultFooterProps) => {
  return (
    <div className="card-event__footer">
      <div
        className="is-mobile"
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {user && (
          <Vote
            amend={target}
            match={{ params: { id: target._id } }}
            user={user}
            withIcon={true}
          />
        )}
        <div className="card-event__resultbar--size">
          <ResultBar
            results={{
              up: target.results.upVotesCount,
              down: target.results.downVotesCount,
              ind: target.results.indVotesCount
            }}
          />
        </div>
      </div>
    </div>
  )
}
