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

// Services
import { Time } from '../../../services'

interface IAmendEventCardProps {
  /** Related event */
  target: { error: any; data: IAmend }
  /** user data */
  user: IUser | null
  measure: any
  /** Index of the card */
  index: number
}

export const AmendEventCard = ({
  target,
  user,
  measure,
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
            {text && text.data && target && target.data && (
              <div style={{ margin: '0.5em 0' }}>
                <DiffPreview
                  amend={target.data}
                  text={text.data}
                  measure={measure}
                />
              </div>
            )}
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
    </div>
  )
}
