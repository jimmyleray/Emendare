// Dependencies
import React from 'react'

// Components
import {
  Icon,
  Collapse,
  Button,
  StopWatch,
  DiffPreview,
  DataContext,
  ResultFooterCard,
  CardLayout,
  Divider
} from '../../../components'

// Interfaces
import { IUser, IText, IResponse, IAmend } from '../../../../../interfaces'

// Helpers
import {
  getIconFromResult,
  getColorTextFromResult,
  getTextFromResult
} from './helper'

interface IResultEventCardProps {
  /** Related event */
  target: IAmend
  /** user data */
  user: IUser | null
  measure: any
  /** Index of the card */
  index: number
}

export const ResultEventCard = ({ target, measure }: IResultEventCardProps) => {
  const { get } = React.useContext(DataContext)
  const text: IResponse<IText> = get('text')(target.text)

  React.useEffect(() => {
    if (measure && text) {
      measure()
    }
  }, [text])

  return (
    <CardLayout>
      <CardLayout.Icon>
        <Icon
          name={getIconFromResult(target)}
          type={'light'}
          size="fa-2x"
          className={getColorTextFromResult(target) + ' is-large'}
        />
      </CardLayout.Icon>
      <CardLayout.Description>
        <div>
          <strong>Résultat</strong>
          {' - '}
          <small style={{ wordSpacing: 'normal' }}>
            <StopWatch date={target.created} />
          </small>
          <br />
          <p>
            L'amendement{' '}
            <span className="has-text-weight-semibold">"{target.name}"</span> a
            été {getTextFromResult(target)}
          </p>
        </div>
      </CardLayout.Description>
      <CardLayout.Detail>
        {text && text.data && target && (
          <Collapse
            isOpen={target.patch !== null && target.patch.length < 1500}
          >
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
                    Réduire les modifications proposées
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
                    Afficher les modifications proposées
                  </Button>
                )
              }
            </Collapse.Trigger>
            <Collapse.Detail style={{ marginTop: '0.5rem', padding: '1rem' }}>
              <Divider content="Modifications proposées" />
              <DiffPreview amend={target} text={text.data} measure={measure} />
            </Collapse.Detail>
          </Collapse>
        )}
      </CardLayout.Detail>
      <CardLayout.Footer>
        {!target.conflicted && (
          <div className="card-event__footer">
            <ResultFooterCard target={target} user={null} />
          </div>
        )}
      </CardLayout.Footer>
    </CardLayout>
  )
}
