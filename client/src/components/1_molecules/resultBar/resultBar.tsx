// Dependencies
import React from 'react'
// Helpers
import { getPourcentageVote, createLinearGradientFromResult } from './helper'
// Components
import { Progress } from '../../../components'

interface IResultBarProps {
  /** Result of the vote */
  results: { up: number; down: number; ind: number }
}

export const ResultBar = React.memo(({ results }: IResultBarProps) => {
  const pourcentageVote = getPourcentageVote(results)
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'baseline',
        fontSize: '0.9rem'
      }}
    >
      <span
        className={`${
          results.down < results.up
            ? 'has-text-info has-text-weight-semibold'
            : 'has-text-grey-light'
        } `}
      >
        {pourcentageVote.up}%
      </span>
      <Progress
        style={{
          WebkitAppearance: 'listbox',
          backgroundImage: createLinearGradientFromResult(pourcentageVote),
          height: '0.4rem',
          margin: '0 0.5rem'
        }}
        value={100}
        max={100}
      >
        100%
      </Progress>
      <span
        className={`${
          results.down >= results.up
            ? 'has-text-danger has-text-weight-semibold'
            : 'has-text-grey-light'
        }`}
      >
        {pourcentageVote.down}%
      </span>
    </div>
  )
})
