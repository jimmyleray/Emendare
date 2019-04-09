import React from 'react'
import { CellMeasurerCache } from 'react-virtualized'
import { IEvent } from '../../../../interfaces'

export const withEventCard = (Component: React.ComponentType<any>) => (
  cache: CellMeasurerCache,
  index: number,
  updateRow: (index: number) => void,
  event: IEvent
) => <Component {...{ cache, index, updateRow, event }} />
