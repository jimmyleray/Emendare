import React from 'react'

// Components
import {
  ProposeAmend,
  Icon,
  StopWatch,
  FollowText,
  UnFollowText,
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
  React.useEffect(() => {
    if (measure && target) {
      measure()
    }
  }, [measure, target])

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
        <div className="card-event__footer">
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              {user ? (
                <ProposeAmend withIcon={true} text={target} />
              ) : (
                <div
                  className="has-text-grey-light"
                  style={{ border: 'none', padding: 'none' }}
                >
                  <Icon
                    type={'light'}
                    name="fa-pencil-alt"
                    className="fa-lg"
                    style={{ marginRight: '0.5rem' }}
                  />
                  {target.amends.length}
                </div>
              )}
            </div>
            <div style={{ marginLeft: '1.5rem' }}>
              {user ? (
                user.followedTexts.find(textID => textID === target.id) ? (
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
                  style={{ border: 'none', padding: '0px 1.5rem 0px 0px' }}
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
            </div>
          </div>
        </div>
      </CardLayout.Footer>
    </CardLayout>
  )
}
