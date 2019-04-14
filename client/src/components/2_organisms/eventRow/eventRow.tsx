import React, { useContext } from 'react'
// Components
import {
  TextEventCard,
  AmendEventCard,
  ResultEventCard,
  DataContext,
  UserContext
} from '../../../components'
// Interfaces
import { IEvent } from '../../../../../interfaces'
// HoCs
import { withEventCard } from '../../../hocs'

interface IEventRowProps {
  /** Following event */
  data: IEvent
  /** Tell if the event is new */
  isNew?: boolean
  /** Index of the row */
  index: number
  measure: any
}

const displayRightEvent = (type: string): React.ComponentType<any> => {
  switch (type) {
    case 'text':
      return TextEventCard
    case 'amend':
      return AmendEventCard
    case 'result':
      return ResultEventCard
    default:
      return () => null
  }
}

export const EventRow = ({ data, measure, index }: IEventRowProps) => {
  const { get } = useContext(DataContext)
  const { user } = useContext(UserContext)

  const eventType = data.target.type === 'result' ? 'amend' : data.target.type
  const target = get(eventType)(data.target.id)

  return (
    <React.Fragment>
      {target && target.data && (
        <React.Fragment>
          <div style={{ padding: '0.5rem' }}>
            {withEventCard(measure, index, target, user)(
              displayRightEvent(data.target.type)
            )}
          </div>
          <hr style={{ margin: 0 }} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
