import { useContext } from 'react'
import { IEvent } from '../../../../interfaces'
import { DataContext, UserContext } from '../../components'

export const useEventCard = (event: IEvent) => {
  const { get } = useContext(DataContext)
  const { user } = useContext(UserContext)

  const target = get(
    event.target.type === 'result' ? 'amend' : event.target.type
  )(event.target.id)

  return { user, target }
}
