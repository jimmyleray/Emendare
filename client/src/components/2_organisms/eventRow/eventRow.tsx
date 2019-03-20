import React from 'react'
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { Event, Divider, I18nContext } from '../../../components'
import { IEvent } from '../../../../../interfaces'

interface IEventRowProps {
  /** Parent node */
  parent: MeasuredCellParent
  /** Cache for cell measurement */
  cache: CellMeasurerCache
  /** Following event */
  data: IEvent
  /** Index of the event */
  index: number
  /** react virtuallized style */
  style: React.CSSProperties
  /** Tell if the event is new */
  isNew: boolean
  /** Tell if the event is last */
  isLast: boolean
  /** Dipacther from EventProvider */
  dispatch: any
}

export const EventRow = ({
  parent,
  cache,
  data,
  index,
  style,
  isNew,
  isLast,
  dispatch
}: IEventRowProps) => {
  const { translate } = React.useContext(I18nContext)

  return (
    <CellMeasurer cache={cache} parent={parent} rowIndex={index}>
      {({ measure }) => (
        <div
          style={style}
          onLoad={measure}
          onClick={() =>
            dispatch({
              type: 'NEW_EVENT_READED',
              payload: { eventId: data._id }
            })
          }
        >
          <Event data={data} />
          {isNew ? (
            <Divider content={translate('OLD_EVENTS')} />
          ) : !isLast ? (
            <hr />
          ) : null}
        </div>
      )}
    </CellMeasurer>
  )
}
