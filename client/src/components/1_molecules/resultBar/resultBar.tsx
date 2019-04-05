// Dependencies
import React from 'react'
// Interfaces
import { IResult } from '../../../../../interfaces'
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
  return (
    <div>
      <Progress
        style={{
          WebkitAppearance: 'progress-bar-value',
          backgroundImage: createLinearGradientFromResult(pourcentageVote)
        }}
        value={100}
        max={100}
      >
        100%
      </Progress>
    </div>
  )
}
