import React from 'react'
import { Event, Divider, I18nContext } from '../../../components'
import { IEvent } from '../../../../../interfaces'

interface IEventRowProps {
  /** Following event */
  data: IEvent
  /** measure tool */
  measure: () => void
  /** Tell if the event is new */
  isNew: boolean
  /** Tell if the event is last */
  isLast: boolean
}

export const EventRow = ({ data, measure, isNew, isLast }: IEventRowProps) => {
  const { translate } = React.useContext(I18nContext)

  return (
    <div onLoad={measure}>
      <Event data={data} />
      {isNew ? (
        <Divider content={translate('OLD_EVENTS')} />
      ) : !isLast ? (
        <hr />
      ) : null}
    </div>
  )
}
