import React, { useContext } from 'react'
// Components
import {
  Icon,
  StopWatch,
  Vote,
  CountDown,
  DiffPreview,
  DataContext,
  Media
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

export const AmendEventCard = ({
  target,
  user,
  cache,
  index
}: IAmendEventCardProps) => {
  const { get } = useContext(DataContext)

  const text: IResponse<IText> = get('text')(target.data.text)

  const displayPreview = React.useMemo(
    () => (
      text: IText,
      index: number,
      target: any,
      cache: CellMeasurerCache
    ) => {
      return (
        <div style={{ margin: '0.5em 0' }}>
          <DiffPreview amend={target.data} text={text} />
        </div>
      )
    },
    [text]
  )

  return (
    <Media className="card-events">
      <Media.Left>
        <Icon
          type={'light'}
          name="fa-plus"
          className="fa-2x has-text-primary is-large"
        />
      </Media.Left>
      <Media.Content style={{ overflowX: 'visible' }}>
        <div>
          <p style={{ margin: 0 }}>
            <strong>Vote en cours</strong>
            {' - '}
            <small style={{ wordSpacing: 'normal' }}>
              <StopWatch date={target.data.created} />
            </small>
          </p>
          <p style={{ marginTop: '0.5em' }}>
            <span className="has-text-weight-semibold is-italic">
              {target.data.name}
            </span>
            <br />
            {target.data.description}
          </p>
          <div style={{ marginTop: '0.5em' }}>
            {target.data.closed ? (
              <span className="has-text-weight-ligh is-italic">
                Amendement terminé.
              </span>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
            {/* {text &&
              text.data &&
              displayPreview(text.data, index, target, cache)} */}
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
      </Media.Content>
    </Media>
  )
}
