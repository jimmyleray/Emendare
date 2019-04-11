import { useContext } from 'react'
import { IEvent } from '../../../../interfaces'
import { DataContext, UserContext } from '../../components'

export const useEventCard = (event: IEvent) => {
  let target
  let user
  if (event) {
    const { get } = useContext(DataContext)
    user = useContext(UserContext)

    target = get(event.target.type === 'result' ? 'amend' : event.target.type)(
      event.target.id
    )
  }
  return { user: user ? user.user : null, target }
}
