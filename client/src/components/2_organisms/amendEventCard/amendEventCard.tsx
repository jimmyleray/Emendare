import React, { useContext } from 'react'
// Components
import {
  Card,
  Icon,
  StopWatch,
  Tag,
  Vote,
  Collapse,
  DiffPreview,
  DataContext
} from '../../../components'
// Interfaces
import { IEvent, IResponse, IText } from '../../../../../interfaces'
// Hooks
import { useEventCard } from '../../../hooks'

interface IAmendEventCardProps {
  /** Related event */
  event: IEvent
  /** Force a row to re-render */
  updateRow: () => void
  /** Index of the card */
  index?: number
}

export const AmendEventCard = ({ event, updateRow }: IAmendEventCardProps) => {
  const { user, target } = useEventCard(event)
  const { get } = useContext(DataContext)
  const text: IResponse<IText> =
    target && target.data && get('text')(target.data.text)
  return target && target.data && text && text.data ? (
    <div className="message card-events-container">
      <div
        className="message-body"
        style={{ borderColor: 'hsl(171, 100%, 41%)' }}
      >
        <Card className="card-events">
          <Card.Header className="card-events-header">
            <div className="card-events-header-icon">
              <Tag className="is-size-7">
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
                  name="fa-plus"
                  type={'light'}
                  size="fa-lg"
                  className="has-text-primary"
                />{' '}
                Nouvel Amendement :
              </p>
            </Card.Header.Title>
          </Card.Header>
          <hr style={{ margin: 0 }} className="has-background-grey-lighter" />
          <Card.Content style={{ padding: '1rem 0 1rem 0.75rem' }}>
            <Collapse>
              <Collapse.Trigger
                style={{ marginBottom: '1.5em' }}
                onClick={updateRow}
              >
                {(on: boolean) => (
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div className="title is-5">"{target.data.name}"</div>
                      <div className="subtitle is-size-6">
                        {target.data.description}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {!on ? (
                        <Icon
                          name="fa-chevron-circle-down"
                          className="is-size-4 hover-circle is-large"
                        />
                      ) : (
                        <Icon
                          name="fas fa-chevron-circle-up"
                          className="is-size-4 hover-circle is-large"
                        />
                      )}
                    </div>
                  </div>
                )}
              </Collapse.Trigger>
              <Collapse.Detail>
                <DiffPreview amend={target.data} text={text.data} />
              </Collapse.Detail>
            </Collapse>
          </Card.Content>
          {user && (
            <Vote
              className="is-centered"
              user={user}
              amend={target.data}
              match={{ params: { id: target.data._id } }}
              withText={false}
              withResult={true}
            />
          )}
        </Card>
      </div>
    </div>
  ) : null
}
