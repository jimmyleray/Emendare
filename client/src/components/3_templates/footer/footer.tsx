import React, { useEffect } from 'react'
import {
  Link,
  Icon,
  I18nContext,
  UserContext,
  EventsContext
} from '../../../components'
import { Title } from '../../../services'
import { path } from '../../../config'
import useLocation from 'react-use/lib/useLocation'
import { Socket } from '../../../services'

export const Footer = ({ className }: any) => {
  const { translate } = React.useContext(I18nContext)
  const location = useLocation()

  const userContext = React.useContext(UserContext)
  const { newEvents, hasNextPage } = React.useContext(EventsContext)

  useEffect(() => {
    if (userContext.user && hasNextPage) {
      Socket.emit('events')
    }
  }, [userContext.user])

  const newEventsCount = userContext.user ? newEvents.length : 0
  Title.badgeCount = newEventsCount

  return (
    <React.Fragment>
      <hr style={{ margin: 0 }} />
      <div className={'tabs is-fullwidth is-medium ' + className}>
        <ul>
          <li className={location.pathname === path.home ? 'is-active' : ''}>
            <Link to={path.home}>
              <Icon type={'light'} name="fa-home" />
              <span className="is-hidden-mobile">{translate('HOME')}</span>
            </Link>
          </li>
          <li className={location.pathname === path.explore ? 'is-active' : ''}>
            <Link to={path.explore}>
              <Icon type={'light'} name="fa-search" />
              <span className="is-hidden-mobile">{translate('EXPLORE')}</span>
            </Link>
          </li>
          <li className={location.pathname === path.news ? 'is-active' : ''}>
            <Link to={path.news}>
              <Icon
                type={'light'}
                name="fa-bell"
                className={newEventsCount > 0 ? 'badge is-badge-danger' : ''}
                data-badge={newEventsCount}
              />
              <span className="is-hidden-mobile">{translate('NEWS')}</span>
            </Link>
          </li>
          <li className={location.pathname === path.profile ? 'is-active' : ''}>
            <Link to={path.profile}>
              <Icon type={'light'} name="fa-user" />
              <span className="is-hidden-mobile">{translate('PROFILE')}</span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
