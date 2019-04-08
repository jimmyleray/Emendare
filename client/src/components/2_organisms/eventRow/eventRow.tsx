import React from 'react'
import {
  Event,
  Divider,
  I18nContext,
  TextEventCard,
  AmendEventCard,
  ResultEventCard
} from '../../../components'
import { IEvent } from '../../../../../interfaces'

interface IEventRowProps {
  /** Following event */
  data: IEvent
  /** Tell if the event is new */
  isNew: boolean
  /** Force a row to re-render */
  updateRow: (index: number) => void
  /** Index of the row */
  index: number
}

const displayRightEvent = (
  type: string,
  event: IEvent,
  updateRow: (index: number) => void,
  index: number
) => {
  switch (type) {
    case 'text':
      return <TextEventCard event={event} />
    case 'amend':
      return <AmendEventCard event={event} updateRow={() => updateRow(index)} />
    case 'result':
      return <ResultEventCard event={event} />
    default:
      return <Event data={event} />
  }
}

export const EventRow = ({ data, isNew, updateRow, index }: IEventRowProps) => {
  const { translate } = React.useContext(I18nContext)

  return (
    <div>
      {data && displayRightEvent(data.target.type, data, updateRow, index)}
      {isNew ? <Divider content={translate('OLD_EVENTS')} /> : null}
    </div>
  )
}
