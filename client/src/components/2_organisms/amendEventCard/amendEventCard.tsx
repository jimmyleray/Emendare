import React, { useContext } from 'react'
// Components
import {
  Icon,
  StopWatch,
  Vote,
  CountDown,
  DiffPreview,
  DataContext
} from '../../../components'
// Interfaces
import { IUser, IResponse, IText, IAmend } from '../../../../../interfaces'
import { CellMeasurerCache } from 'react-virtualized'
// Services
import { Time } from '../../../services'

interface IAmendEventCardProps {
  /** Related event */
  target: { error: any; data: IAmend }
  /** user data */
  user: IUser | null
  /** Force a row to re-render */
  resizeRow: (index: number) => void
  /** Cache of row Heights */
  cache: CellMeasurerCache
  /** Index of the card */
  index: number
}

const displayPreview = (
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
}

export const AmendEventCard = ({
  target,
  user,
  cache,
  index
}: IAmendEventCardProps) => {
  const { get } = useContext(DataContext)

  const text: IResponse<IText> = get('text')(target.data.text)

  return (
    <div className="media card-events">
      <div className="media-left">
        <Icon
          type={'light'}
          name="fa-plus"
          className="fa-2x has-text-primary is-large"
        />
      </div>
      <div className="media-content" style={{ overflowX: 'visible' }}>
        <div>
          <p style={{ margin: 0 }}>
            <strong>{target.data.name}</strong>
            {' - '}
            <small style={{ wordSpacing: 'normal' }}>
              <StopWatch date={target.data.created} />
            </small>
            <br />
            {target.data.description}
          </p>
          <div style={{ marginTop: '0.5em' }}>
            <span className="has-text-weight-ligh is-italic">
              Temps restant :{' '}
            </span>
            <CountDown
              date={Time.addTimeToDate(
                target.data.created,
                target.data.rules.delayMax
              )}
              className="has-text-weight-semibold"
            />
            {text &&
              text.data &&
              displayPreview(text.data, index, target, cache)}
          </div>
        </div>
        <div className="card-events-footer">
          {user && (
            <Vote
              amend={target.data}
              match={{ params: { id: target.data._id } }}
              user={user}
              withIcon={true}
            />
          )}
        </div>
      </div>
      <div className="media-right" />
    </div>
  )
}
