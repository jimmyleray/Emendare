import React from 'react'
import { CellMeasurerCache } from 'react-virtualized'

// Components
import {
  ProposeAmend,
  Icon,
  StopWatch,
  FollowText,
  UnFollowText,
  Columns,
  Column
} from '../../../components'

// Interfaces
import { IUser, IText } from '../../../../../interfaces'

interface ITextEventCard {
  /** Related event */
  target: { error: any; data: IText }
  /** user data */
  user: IUser | null
  /** Index of the card */
  index: number
}

export const TextEventCard = ({ target, user }: ITextEventCard) => (
  <div className="media card-events">
    <div className="media-left">
      <Icon
        type={'light'}
        name="fa-align-center"
        className="fa-2x has-text-info is-large"
      />
    </div>
    <div className="media-content" style={{ overflowX: 'visible' }}>
      <div>
        <p>
          <strong>{target.data.name}</strong>
          {' - '}
          <small style={{ wordSpacing: 'normal' }}>
            <StopWatch date={target.data.created} />
          </small>
          <br />
          {target.data.description}
        </p>
        <div className="card-events-footer">
          <Columns className="is-mobile has-text-centered">
            <Column className="is-one-third">
              {user ? (
                <ProposeAmend withIcon={true} text={target.data} />
              ) : (
                <div
                  className="has-text-grey-light"
                  style={{ border: 'none', padding: 'none' }}
                >
                  <Icon
                    type={'light'}
                    name="fa-comments"
                    className="fa-lg"
                    style={{ marginRight: '0.5rem' }}
                  />
                  {target.data.amends.length}
                </div>
              )}
            </Column>
            <Column className="is-one-third">
              {user ? (
                user.followedTexts.find(
                  textID => textID === target.data._id
                ) ? (
                  <UnFollowText
                    text={target.data}
                    withIcon={true}
                    className="has-text-info"
                  />
                ) : (
                  <FollowText text={target.data} withIcon={true} />
                )
              ) : (
                <div
                  className="has-text-grey-light"
                  style={{ border: 'none', padding: 'none' }}
                >
                  <Icon
                    type={'light'}
                    name="fa-user"
                    className="fa-lg"
                    style={{ marginRight: '0.5rem' }}
                  />
                  {target.data.followersCount}
                </div>
              )}
            </Column>
          </Columns>
        </div>
      </div>
    </div>
    <div className="media-right" />
  </div>
)
