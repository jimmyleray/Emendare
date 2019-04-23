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
  Collapse,
  Button,
  Background,
  CardLayout
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
    <CardLayout>
      <CardLayout.Icon>
        <Icon
          type={'light'}
          name="fa-align-center"
          className="fa-2x has-text-info is-large"
        />
      </CardLayout.Icon>
      <CardLayout.Description>
        <p>
          <strong>{target.name}</strong>
          {' - '}
          <small style={{ wordSpacing: 'normal' }}>
            <StopWatch date={target.created} />
          </small>
          <br />
          {target.description}
        </p>
      </CardLayout.Description>
      <CardLayout.Detail>
        {target.actual.length > 0 && (
          <Collapse isOpen={target.actual.length < 1500}>
            <Collapse.Trigger style={{ marginLeft: '60px' }} onClick={measure}>
              {(on: boolean) =>
                on ? (
                  <Button
                    style={{
                      background: 'none',
                      margin: '0.5rem 0 0.5rem 0',
                      padding: 0
                    }}
                    className="no-focus-outlined is-text"
                  >
                    Réduire le texte
                  </Button>
                ) : (
                  <Button
                    style={{
                      background: 'none',
                      margin: '0.5rem 0 0.5rem 0',
                      padding: 0
                    }}
                    className="no-focus-outlined has-text-info is-text"
                  >
                    Afficher le texte
                  </Button>
                )
              }
            </Collapse.Trigger>
            <Collapse.Detail style={{ marginTop: '0.5rem', padding: '1rem' }}>
              <Background className="has-background-light">
                {target.actual &&
                  target.actual
                    .split('\n')
                    .map((line: string, index: number) =>
                      line ? <p key={index}>{line}</p> : <br key={index} />
                    )}
              </Background>
            </Collapse.Detail>
          </Collapse>
        )}
      </CardLayout.Detail>
      <CardLayout.Footer>
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
      </CardLayout.Footer>
    </CardLayout>
  )
}
