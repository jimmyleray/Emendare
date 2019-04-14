import React from 'react'
import { IUser } from '../../../../interfaces'
import { CellMeasurerCache } from 'react-virtualized'

export const withEventCard = (
  updateRow: any,
  index: number,
  target: any,
  user: IUser | null
) => (Component: React.ComponentType<any>) => (
  <Component {...{ updateRow, index, target, user }} />
)
