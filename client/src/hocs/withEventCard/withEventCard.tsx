import React from 'react'
import { CellMeasurerCache } from 'react-virtualized'
import { IUser } from '../../../../interfaces'

export const withEventCard = (
  cache: CellMeasurerCache,
  index: number,
  resizeRow: (index: number) => void,
  target: any,
  user: IUser | null
) => (Component: React.ComponentType<any>) => (
  <Component {...{ cache, index, resizeRow, target, user }} />
)
