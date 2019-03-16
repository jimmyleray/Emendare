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
  /** Key of the row */
  key: string
  /** Following event */
  data: IEvent
  /** Index of the event */
  index: number
  /** react virtuallized style */
  style: React.CSSProperties
  /** Tell if the event is new */
  isNew: boolean
}

export const EventRow = ({
  parent,
  cache,
  key,
  data,
  index,
  style,
  isNew
}: IEventRowProps) => {
  const { translate } = React.useContext(I18nContext)

  return (
    <CellMeasurer cache={cache} parent={parent} key={key} rowIndex={index}>
      {({ measure }) => (
        <div key={key} style={style} onLoad={measure}>
          <div style={{ marginBottom: '4px' }}>
            <Event data={data} />
            {isNew && <Divider content={translate('OLD_EVENTS')} />}
          </div>
        </div>
      )}
    </CellMeasurer>
  )
}
