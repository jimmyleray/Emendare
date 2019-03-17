import React from 'react'
import {
  Link,
  Icon,
  I18nContext,
  UserContext,
  DataContext
} from '../../../components'
import { Title } from '../../../services'
import { IUser } from '../../../../../interfaces'
import { path } from '../../../config'
import { useLocation } from 'react-use'

export const Footer = () => {
  const { translate } = React.useContext(I18nContext)
  const location = useLocation()

  const userContext = React.useContext(UserContext)
  const dataContext = React.useContext(DataContext)

  const events = dataContext.get && dataContext.get('events')('all')
  let newEventsCount = 0

  if (userContext.user && events && events.data) {
    newEventsCount = events.data.filter(
      (event: any) =>
        new Date(event.created).getTime() >
        new Date((userContext.user as IUser).lastEventDate).getTime()
    ).length

    Title.badgeCount = newEventsCount
  } else {
    Title.badgeCount = 0
  }

  return (
    <React.Fragment>
      <hr style={{ margin: 0 }} />
      <div className="tabs is-fullwidth is-medium">
        <ul>
          <li className={location.pathname === path.home ? 'is-active' : ''}>
            <Link to={path.home}>
              <Icon type="fas fa-home" />
              <span className="is-hidden-mobile">{translate('HOME')}</span>
            </Link>
          </li>
          <li className={location.pathname === path.news ? 'is-active' : ''}>
            <Link to={path.news}>
              <Icon
                type="fas fa-bell"
                className={newEventsCount > 0 ? 'badge is-badge-danger' : ''}
                data-badge={newEventsCount}
              />
              <span className="is-hidden-mobile">{translate('NEWS')}</span>
            </Link>
          </li>
          <li className={location.pathname === path.explore ? 'is-active' : ''}>
            <Link to={path.explore}>
              <Icon type="fas fa-search" />
              <span className="is-hidden-mobile">{translate('EXPLORE')}</span>
            </Link>
          </li>
          <li className={location.pathname === path.profile ? 'is-active' : ''}>
            <Link to={path.profile}>
              <Icon type="fas fa-user" />
              <span className="is-hidden-mobile">{translate('PROFILE')}</span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
