import React, { useEffect } from 'react'
// Components
import {
  Divider,
  I18nContext,
  TextEventCard,
  AmendEventCard,
  ResultEventCard
} from '../../../components'
// Interfaces
import { IEvent } from '../../../../../interfaces'
// ReactVirtualized
import { CellMeasurerCache } from 'react-virtualized'
// HoCs
import { withEventCard } from '../../../hocs'
// Hooks
import { useEventCard } from '../../../hooks'

interface IEventRowProps {
  /** Following event */
  data: IEvent
  /** Tell if the event is new */
  isNew: boolean
  /** Force a row to re-render */
  resizeRow: (index: number) => void
  /** Index of the row */
  index: number
  /** Cache of heights */
  cache: CellMeasurerCache
}

export const EventRow = ({
  data,
  isNew,
  resizeRow,
  cache,
  index
}: IEventRowProps) => {
  const { target, user } = useEventCard(data)
  const { translate } = React.useContext(I18nContext)

  useEffect(() => {
    resizeRow(index)
  }, [target])

  const passDataToCard = withEventCard(cache, index, resizeRow, target, user)

  const displayRightEvent = () => {
    switch (data.target.type) {
      case 'text':
        return passDataToCard(TextEventCard)
      case 'amend':
        return passDataToCard(AmendEventCard)
      case 'result':
        return passDataToCard(ResultEventCard)
    }
  }

  return (
    <React.Fragment>
      {target && target.data && displayRightEvent()}
      {isNew ? <Divider content={translate('OLD_EVENTS')} /> : null}
    </React.Fragment>
  )
}
