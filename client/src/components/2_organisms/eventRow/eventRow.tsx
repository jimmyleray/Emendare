import React, { useEffect, useContext } from 'react'
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
// ReactVirtualized
import { CellMeasurerCache } from 'react-virtualized'
// HoCs
import { withEventCard } from '../../../hocs'

interface IEventRowProps {
  /** Following event */
  data: IEvent
  /** Tell if the event is new */
  isNew: boolean
  /** Index of the row */
  index: number
  /** Cache of heights */
  cache: CellMeasurerCache
  /** Cache of heights */
  measure: any
}

export const EventRow = ({
  data,
  isNew,
  measure,
  cache,
  index
}: IEventRowProps) => {
  const { get } = useContext(DataContext)
  const { user } = useContext(UserContext)

  const eventType = data.target.type === 'result' ? 'amend' : data.target.type
  const target = get(eventType)(data.target.id)

  useEffect(() => {
    if (target) {
      measure()
    }
  }, [target])

  const withCard = withEventCard(measure, index, target, user)

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

  return (
    <React.Fragment>
      {target && target.data && withCard(displayRightEvent(data.target.type))}
    </React.Fragment>
  )
}
