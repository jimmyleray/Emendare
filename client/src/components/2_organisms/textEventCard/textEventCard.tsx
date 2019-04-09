import React from 'react'
import { CellMeasurerCache } from 'react-virtualized'
// Components
import {
  Card,
  ProposeAmend,
  Icon,
  StopWatch,
  Tag,
  FollowText,
  UnFollowText,
  Buttons
} from '../../../components'
// Interfaces
import { IEvent, IUser, IText } from '../../../../../interfaces'
// Hooks
import { useEventCard } from '../../../hooks'

interface ITextEventCard {
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

const displayBtnFollowText = (user: IUser, text: IText) => {
  return user.followedTexts.find(textID => textID === text._id) ? (
    <UnFollowText text={text} className="is-small" />
  ) : (
    <FollowText text={text} className="is-small" />
  )
}

export const TextEventCard = ({ target, user }: ITextEventCard) => (
  <div className="message card-events-container">
    <div className="message-body" style={{ borderColor: 'hsl(204, 86%, 53%)' }}>
      <Card className="card-events">
        <Card.Header className="card-events-header">
          <div className="card-events-header-icon">
            <Tag className="is-size-7 has-background-light">
              <StopWatch
                date={target.data.created}
                className="has-text-weight-semibold"
              />
              <Icon name="fa-history" className="fa-lg" />
            </Tag>
          </div>
          <Card.Header.Title>
            <p>
              <Icon
                type={'light'}
                name="fa-align-center"
                className="fa-lg has-text-info"
              />{' '}
              Nouveau texte
            </p>
          </Card.Header.Title>
        </Card.Header>
        <hr style={{ margin: 0 }} className="has-background-grey-lighter" />
        <Card.Content style={{ padding: '1rem 0 1rem 0.75rem' }}>
          <div className="title is-5">"{target.data.name}"</div>
          <div className="subtitle is-size-6">{target.data.description}</div>
        </Card.Content>
        <Buttons className="is-centered">
          {user ? (
            <React.Fragment>
              <ProposeAmend text={target.data} className="is-small" />
              {displayBtnFollowText(user, target.data)}
            </React.Fragment>
          ) : null}
        </Buttons>
      </Card>
    </div>
  </div>
)
