// Dependencies
import React, { useContext } from 'react'
import { CellMeasurerCache } from 'react-virtualized'
// Components
import { Icon, StopWatch, DiffPreview, DataContext } from '../../../components'
// Interfaces
import { IUser, IText, IResponse } from '../../../../../interfaces'
// Helpers
import {
  getIconFromResult,
  getColorTextFromResult,
  getTextFromResult
} from './helper'
import { ResultEventCardFooter } from './resultEventCardFooter'

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

export const ResultEventCard = ({
  target,
  index,
  cache
}: IResultEventCardProps) => {
  const { get } = useContext(DataContext)
  const text: IResponse<IText> = get('text')(target.data.text)

  const displayPreview = React.useMemo(
    () => (
      text: IText,
      index: number,
      target: any,
      cache: CellMeasurerCache
    ) => {
      setTimeout(() => cache.clear(index, 0), 0)
      return (
        <div style={{ margin: '0.5em 0' }}>
          <DiffPreview amend={target.data} text={text} />
        </div>
      )
    },
    [text]
  )

  return (
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
          <strong>Résultat</strong>
          {' - '}
          <small style={{ wordSpacing: 'normal' }}>
            <StopWatch date={target.data.created} />
          </small>
          <br />
          <p>
            L'amendement{' '}
            <span className="has-text-weight-semibold">
              "{target.data.name}"
            </span>{' '}
            a été {getTextFromResult(target.data)}
          </p>
        </div>
        {text && text.data && displayPreview(text.data, index, target, cache)}
        {!target.data.conflicted && (
          <div className="card-events-footer">
            <ResultEventCardFooter amend={target.data} />
          </div>
        )}
      </div>
    </div>
  )
}
