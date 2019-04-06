// Dependencies
import React from 'react'
// Components
import { Card, Icon, StopWatch, Tag, ResultIcon } from '../../../components'
// Interfaces
import { IEvent } from '../../../../../interfaces'
// Helpers
import {
  getColorFromResult,
  getIconFromResult,
  getColorTextFromResult,
  getTextFromResult
} from './helper'
// Hooks
import { useEventCard } from '../../../hooks'

interface IResultEventCardProps {
  /** Related event */
  event: IEvent
}

export const ResultEventCard = ({ event }: IResultEventCardProps) => {
  const { target } = useEventCard(event)

  return target && target.data ? (
    <div className="message card-events-container">
      <div
        className="message-body card-events-body"
        style={{ borderColor: getColorFromResult(target.data) }}
      >
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
                  name={getIconFromResult(target.data)}
                  type={'light'}
                  size="fa-lg"
                  className={getColorTextFromResult(target.data)}
                />{' '}
                Résultat Amendement
              </p>
            </Card.Header.Title>
          </Card.Header>
          <hr style={{ margin: 0 }} className="has-background-grey-lighter" />
          <Card.Content style={{ padding: '1rem 0 1rem 0.75rem' }}>
            <div>
              L'amendement{' '}
              <span className="has-text-weight-semibold">
                "{target.data.name}"
              </span>{' '}
              a été {getTextFromResult(target.data)}
            </div>
          </Card.Content>
          {!target.data.conflicted && (
            <ResultIcon
              results={target.data.results}
              isConfliced={target.data.conflicted}
            />
          )}
        </Card>
      </div>
    </div>
  ) : null
}
