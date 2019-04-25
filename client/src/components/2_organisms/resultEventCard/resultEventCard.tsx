// Dependencies
import React from 'react'

// Components
import {
  Icon,
  StopWatch,
  DiffPreview,
  DataContext,
  ResultFooterCard,
  CardLayout
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
          <div style={{ margin: '0.5em 0' }}>
            <p className="has-text-centered has-text-weight-light is-italic is-size-6">
              Modifications proposées
            </p>
            <DiffPreview amend={target} text={text.data} measure={measure} />
          </div>
        )}
      </CardLayout.Detail>
      <CardLayout.Footer>
        {!target.conflicted && (
          <div className="card-event__footer">
            <ResultFooterCard target={target} user={null} />
            {/* {navigator && (navigator as any).clipboard && (
                <Column className="is-one-third">
                  <Button
                    disabled
                    onClick={async () => {
                      const url = new URL(
                        path.share(target._id),
                        location.origin
                      )
                      await (navigator as any)!.clipboard!.writeText(url.href)
                    }}
                    style={{
                      border: 'none',
                      height: '24px',
                      outline: 'none',
                      backgroundColor: 'transparent'
                    }}
                    className={'has-text-info'}
                  >
                    <Icon type={'light'} size={'fa-lg'} name="fa-link" />
                  </Button>
                </Column>
              )} */}
          </div>
        )}
      </CardLayout.Footer>
    </CardLayout>
  )
}
