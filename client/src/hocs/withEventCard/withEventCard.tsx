import React from 'react'
import { CellMeasurerCache } from 'react-virtualized'
import { IEvent } from '../../../../interfaces'

export const withEventCard = (
  cache: CellMeasurerCache,
  index: number,
  updateRow: (index: number) => void,
  event: IEvent
) => (Component: React.ComponentType<any>) => (
  <Component {...{ cache, index, updateRow, event }} />
)
