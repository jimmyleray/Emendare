import React from 'react'
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

interface IEventRowProps {
  /** Following event */
  data: IEvent
  /** Tell if the event is new */
  isNew: boolean
  /** Force a row to re-render */
  updateRow: (index: number) => void
  /** Index of the row */
  index: number
  /** Cache of heights */
  cache: CellMeasurerCache
}

export const EventRow = ({
  data,
  isNew,
  updateRow,
  cache,
  index
}: IEventRowProps) => {
  const { translate } = React.useContext(I18nContext)

  const passDataToCard = withEventCard(cache, index, updateRow, data)

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
      {data && displayRightEvent()}
      {isNew ? <Divider content={translate('OLD_EVENTS')} /> : null}
    </React.Fragment>
  )
}
