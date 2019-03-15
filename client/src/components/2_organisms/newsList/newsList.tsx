import React, { useContext } from 'react'
import { EventRow } from './eventRow'
import { useComponentSize } from '../../../hooks'
import { I18nContext } from '../../5_contexts'
import { CellMeasurerCache, WindowScroller, List } from 'react-virtualized'
import { IEvent } from '../../../../../interfaces'

interface INewsListProps {
  /** List of events */
  events: Array<IEvent>
  /** Date of the last event */
  lastEventDate: number | null
  /** The number of new events */
  newEventsCount: number | null
}

const isEventNew = (
  lastEventDate: number | null,
  newEventsCount: number | null,
  events: Array<IEvent>,
  index: number
) => {
  if (lastEventDate && newEventsCount) {
    if (
      new Date(events[index].created).getTime() > lastEventDate &&
      events[index + 1] &&
      new Date(events[index + 1].created).getTime() < lastEventDate
    ) {
      return true
    }
  }
  return false
}

export const NewsList = ({
  events,
  lastEventDate,
  newEventsCount
}: INewsListProps) => {
  const { ref, width } = useComponentSize()
  const { translate } = useContext(I18nContext)

  /** Default cache for cell mesurement */
  const cache = new CellMeasurerCache({
    defaultHeight: 70,
    fixedWidth: true
  })

  return (
    <div ref={ref}>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <List
            autoHeight
            width={width}
            rowCount={events.length}
            itemData={events}
            height={height}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            scrollTop={scrollTop}
            rowRenderer={props => (
              <EventRow
                data={events[props.index]}
                isNew={isEventNew(
                  lastEventDate,
                  newEventsCount,
                  events,
                  props.index
                )}
                cache={cache}
                translate={translate}
                parent={props.parent}
                key={props.key}
                index={props.index}
                style={props.style}
                {...props}
              />
            )}
          />
        )}
      </WindowScroller>
    </div>
  )
}
