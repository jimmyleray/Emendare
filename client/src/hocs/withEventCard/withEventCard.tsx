import React from 'react'
import { IUser } from '../../../../interfaces'

export const withEventCard = (
  measure: any,
  index: number,
  target: any,
  user: IUser | null
) => (Component: React.ComponentType<any>) => (
  <Component {...{ measure, index, target, user }} />
)
