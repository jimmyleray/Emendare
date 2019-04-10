// Dependencies
import React from 'react'
import { CellMeasurerCache } from 'react-virtualized'
// Components
import { Icon, StopWatch } from '../../../components'
// Interfaces
import { IUser } from '../../../../../interfaces'
// Helpers
import {
  getIconFromResult,
  getColorTextFromResult,
  getTextFromResult
} from './helper'
import { Footer } from './footer'

interface IResultEventCardProps {
  /** Related event */
  target: any
  /** user data */
  user: IUser | null
  /** Force a row to re-render */
  updateRow: (index: number) => void
  /** Cache of row Heights */
  cache: CellMeasurerCache
  /** Index of the card */
  index: number
}

export const ResultEventCard = ({ target }: IResultEventCardProps) => (
  <div className="media card-events">
    <div className="media-left">
      <Icon
        name={getIconFromResult(target.data)}
        type={'light'}
        size="fa-2x"
        className={getColorTextFromResult(target.data) + ' is-large'}
      />
    </div>
    <div className="media-content" style={{ overflowX: 'visible' }}>
      <div>
        <p>
          <strong>Résultat</strong>
          {' - '}
          <small style={{ wordSpacing: 'normal' }}>
            <StopWatch date={target.data.created} />
          </small>
          <br />
          <div>
            L'amendement{' '}
            <span className="has-text-weight-semibold">
              "{target.data.name}"
            </span>{' '}
            a été {getTextFromResult(target.data)}
          </div>
        </p>
        {!target.data.conflicted && (
          <div className="card-events-footer">
            <Footer amend={target.data} isConfliced={target.data.conflicted} />
          </div>
        )}
      </div>
    </div>
    <div className="media-right" />
  </div>
)
