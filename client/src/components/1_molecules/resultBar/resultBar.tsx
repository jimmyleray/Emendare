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

export const ResultBar = ({ results }: IResultBarProps) => {
  const pourcentageVote = getPourcentageVote(results)
  console.log(results)
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
          results.down < results.up ? 'has-text-info' : 'has-text-grey-light'
        } `}
      >
        {pourcentageVote.up}%
      </span>
      <Progress
        style={{
          WebkitAppearance: 'progress-bar-value',
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
          results.down > results.up ? 'has-text-danger' : 'has-text-grey-light'
        }`}
      >
        {pourcentageVote.down}%
      </span>
    </div>
  )
}
