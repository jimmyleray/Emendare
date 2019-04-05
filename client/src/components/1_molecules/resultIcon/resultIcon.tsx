import React from 'react'
// Components
import { Icon } from '../../../components'
// Helpers
import { isMaxVote } from './helper'

interface IResultIconProps {
  /** Related Result */
  results: {
    upVotesCount: number
    downVotesCount: number
    indVotesCount: number
    totalPotentialVotesCount: number
  }
  /** Conflicted with an other amend */
  isConfliced: boolean
}

export const ResultIcon = React.memo(
  ({ results, isConfliced }: IResultIconProps) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row'
      }}
    >
      <p
        className={
          isMaxVote('upVotesCount', results, isConfliced)
            ? 'has-text-success'
            : ''
        }
        style={{
          marginRight: '0.5em',
          opacity: isMaxVote('upVotesCount', results, isConfliced) ? 1 : 0.5
        }}
      >
        {results.upVotesCount}{' '}
        <Icon type={'solid'} name="fa-smile" size="fa-lg" />
      </p>
      <p
        className={
          isMaxVote('indVotesCount', results, isConfliced)
            ? 'has-text-info'
            : ''
        }
        style={{
          marginRight: '0.5em',
          opacity: isMaxVote('indVotesCount', results, isConfliced) ? 1 : 0.5
        }}
      >
        {results.indVotesCount}{' '}
        <Icon type={'solid'} name="fa-meh" size="fa-lg" />
      </p>
      <p
        className={
          isMaxVote('downVotesCount', results, isConfliced)
            ? 'has-text-danger'
            : ''
        }
        style={{
          marginRight: '0.5em',
          opacity: isMaxVote('downVotesCount', results, isConfliced) ? 1 : 0.5
        }}
      >
        {results.downVotesCount}{' '}
        <Icon type={'solid'} name="fa-frown" size="fa-lg" />
      </p>
    </div>
  )
)
