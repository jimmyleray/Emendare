import React, { useContext } from 'react'

// Components
import {
  Icon,
  StopWatch,
  Vote,
  Columns,
  CountDown,
  DiffPreview,
  DataContext,
  Media
} from '../../../components'

// Interfaces
import { IUser, IResponse, IText, IAmend } from '../../../../../interfaces'

// Services
import { Time } from '../../../services'

interface IAmendEventCardProps {
  /** Related event */
  target: IAmend
  /** user data */
  user: IUser | null
  measure: any
  /** Index of the card */
  index: number
}

export const AmendEventCard = ({
  target,
  user,
  measure
}: IAmendEventCardProps) => {
  const { get } = useContext(DataContext)
  const text: IResponse<IText> = get('text')(target.text)

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
              <StopWatch date={target.created} />
            </small>
          </p>
          <p style={{ marginTop: '0.5em' }}>
            <span className="has-text-weight-semibold is-italic">
              {target.name}
            </span>
            <br />
            {target.description}
          </p>
          <div style={{ marginTop: '0.5em' }}>
            {target.closed ? (
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
                    target.created,
                    target.rules.delayMax
                  )}
                  className="has-text-weight-semibold"
                />
              </React.Fragment>
            )}
            {text && text.data && target && (
              <div style={{ margin: '0.5em 0' }}>
                <DiffPreview
                  amend={target}
                  text={text.data}
                  measure={measure}
                />
              </div>
            )}
          </div>
        </div>
        <div className="card-events-footer">
          <Columns className="is-mobile has-text-centered">
            {user && (
              <Vote
                amend={target}
                match={{ params: { id: target._id } }}
                user={user}
                withIcon={true}
              />
            )}
          </Columns>
        </div>
      </Media.Content>
    </Media>
  )
}
