// Dependencies
import React from 'react'

// Components
import {
  Icon,
  StopWatch,
  DiffPreview,
  DataContext,
  Media,
  Columns,
  Column,
  Button
} from '../../../components'

// Interfaces
import { IUser, IText, IResponse } from '../../../../../interfaces'

// Helpers
import {
  getIconFromResult,
  getColorTextFromResult,
  getTextFromResult
} from './helper'

import { path } from '../../../config'

interface IResultEventCardProps {
  /** Related event */
  target: any
  /** user data */
  user: IUser | null
  measure: any
  /** Index of the card */
  index: number
}

export const ResultEventCard = ({
  target,
  index,
  measure
}: IResultEventCardProps) => {
  const { get } = React.useContext(DataContext)
  const text: IResponse<IText> = get('text')(target.data.text)

  return (
    <Media className="card-events">
      <Media.Left>
        <Icon
          name={getIconFromResult(target.data)}
          type={'light'}
          size="fa-2x"
          className={getColorTextFromResult(target.data) + ' is-large'}
        />
      </Media.Left>
      <Media.Content style={{ overflowX: 'visible' }}>
        <div>
          <strong>Résultat</strong>
          {' - '}
          <small style={{ wordSpacing: 'normal' }}>
            <StopWatch date={target.data.created} />
          </small>
          <br />
          <p>
            L'amendement{' '}
            <span className="has-text-weight-semibold">
              "{target.data.name}"
            </span>{' '}
            a été {getTextFromResult(target.data)}
          </p>
        </div>

        {text && text.data && target && target.data && (
          <div style={{ margin: '0.5em 0' }}>
            <DiffPreview
              amend={target.data}
              text={text.data}
              measure={measure}
            />
          </div>
        )}

        {!target.data.conflicted && (
          <div className="card-events-footer">
            <Columns className="is-mobile has-text-centered">
              <Column className="is-one-third">
                <div
                  className={
                    target.data.accepted
                      ? 'has-text-success'
                      : 'has-text-grey-light'
                  }
                >
                  <Icon
                    type={'solid'}
                    size={'fa-lg'}
                    name="fa-thumbs-up"
                    style={{ marginRight: '0.5em' }}
                  />
                  {target.data.results.upVotesCount}
                </div>
              </Column>
              <Column className="is-one-third">
                <div
                  className={
                    !target.data.accepted
                      ? 'has-text-danger'
                      : 'has-text-grey-light'
                  }
                >
                  <Icon
                    type={'solid'}
                    size={'fa-lg'}
                    name={'fa-thumbs-down'}
                    style={{ marginRight: '0.5em' }}
                  />
                  {target.data.results.downVotesCount}
                </div>
              </Column>
              {navigator && (navigator as any).clipboard && (
                <Column className="is-one-third">
                  <Button
                    onClick={async () => {
                      const url = new URL(
                        path.share(target.data._id),
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
                    <Icon type={'light'} size={'fa-lg'} name="fa-share" />
                  </Button>
                </Column>
              )}
            </Columns>
          </div>
        )}
      </Media.Content>
    </Media>
  )
}
