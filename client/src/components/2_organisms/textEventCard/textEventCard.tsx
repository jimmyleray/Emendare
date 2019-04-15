import React, { useEffect } from 'react'

// Components
import {
  ProposeAmend,
  Icon,
  StopWatch,
  FollowText,
  UnFollowText,
  Columns,
  Column,
  Media
} from '../../../components'

// Interfaces
import { IUser, IText } from '../../../../../interfaces'

interface ITextEventCard {
  /** Related event */
  target: IText
  /** user data */
  user: IUser | null
  /** Index of the card */
  index: number
  measure: any
}

export const TextEventCard = ({ target, user, measure }: ITextEventCard) => {
  useEffect(() => {
    if (target) {
      measure()
    }
  }, [target])

  return (
    <Media className="card-events">
      <Media.Left>
        <Icon
          type={'light'}
          name="fa-align-center"
          className="fa-2x has-text-info is-large"
        />
      </Media.Left>
      <Media.Content style={{ overflowX: 'visible' }}>
        <div>
          <p>
            <strong>{target.name}</strong>
            {' - '}
            <small style={{ wordSpacing: 'normal' }}>
              <StopWatch date={target.created} />
            </small>
            <br />
            {target.description}
          </p>
          <div className="card-events-footer">
            <Columns className="is-mobile">
              <Column className="is-one-third">
                {user ? (
                  <ProposeAmend withIcon={true} text={target} />
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
                    {target.amends.length}
                  </div>
                )}
              </Column>
              <Column className="is-one-third">
                {user ? (
                  user.followedTexts.find(textID => textID === target._id) ? (
                    <UnFollowText
                      text={target}
                      withIcon={true}
                      className="has-text-info"
                    />
                  ) : (
                    <FollowText text={target} withIcon={true} />
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
                    {target.followersCount}
                  </div>
                )}
              </Column>
            </Columns>
          </div>
        </div>
      </Media.Content>
    </Media>
  )
}
