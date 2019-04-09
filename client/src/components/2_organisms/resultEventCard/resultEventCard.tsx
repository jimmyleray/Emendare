// Dependencies
import React from 'react'
import { CellMeasurerCache } from 'react-virtualized'
// Components
import {
  Card,
  Icon,
  StopWatch,
  Tag,
  ResultIcon,
  Button
} from '../../../components'
// Interfaces
import { IUser } from '../../../../../interfaces'
// Helpers
import {
  getColorFromResult,
  getIconFromResult,
  getColorTextFromResult,
  getTextFromResult
} from './helper'
// Hooks
import { useEventCard } from '../../../hooks'
// Config
import { path } from '../../../config'

interface IResultEventCardProps {
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

export const ResultEventCard = ({ target }: IResultEventCardProps) => (
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex' }}>
            <Button className="is-text" to={path.amend(target.data._id)}>
              +Details
            </Button>
          </div>
          {!target.data.conflicted && (
            <ResultIcon
              results={target.data.results}
              isConfliced={target.data.conflicted}
            />
          )}
        </div>
      </Card>
    </div>
  </div>
)
