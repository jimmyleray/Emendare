import React, { useEffect } from 'react'
import {
  Link,
  Icon,
  I18nContext,
  useUser,
  EventsContext,
  ApiContext
} from '../../../components'
import { Title } from '../../../services'
import { path } from '../../../config'
import useLocation from 'react-use/lib/useLocation'

export const Navtabs = () => {
  const { translate } = React.useContext(I18nContext)
  const location = useLocation()
  const { Socket } = React.useContext(ApiContext)

  const userContext = useUser()
  const { newEvents, hasNextPage } = React.useContext(EventsContext)

  useEffect(() => {
    if (userContext.user && hasNextPage) {
      Socket.emit('events')
    }
  }, [userContext.user])

  const newEventsCount = userContext.user ? newEvents.length : 0
  Title.badgeCount = newEventsCount

  return (
    <div id="navtabs" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div className={'tabs is-fullwidth is-centered is-medium'}>
          <ul>
            <li className={location.pathname === path.home ? 'is-active' : ''}>
              <Link to={path.home} style={{ borderRadius: 0 }}>
                <Icon
                  type={'light'}
                  name="fa-home"
                  className={newEventsCount > 0 ? 'badge is-badge-danger' : ''}
                  data-badge={newEventsCount}
                />
                <span className="is-hidden-mobile">{translate('HOME')}</span>
              </Link>
            </li>
            <li className={location.pathname === path.texts ? 'is-active' : ''}>
              <Link to={path.texts} style={{ borderRadius: 0 }}>
                <Icon type={'light'} name="fa-align-center" />
                <span className="is-hidden-mobile">{translate('TEXTS')}</span>
              </Link>
            </li>
            <li className={location.pathname === path.votes ? 'is-active' : ''}>
              <Link to={path.votes} style={{ borderRadius: 0 }}>
                <Icon type={'light'} name="fa-box-ballot" />
                <span className="is-hidden-mobile">{translate('VOTES')}</span>
              </Link>
            </li>
            <li
              className={location.pathname === path.results ? 'is-active' : ''}
            >
              <Link to={path.results} style={{ borderRadius: 0 }}>
                <Icon type={'light'} name="fa-chart-pie-alt" />
                <span className="is-hidden-mobile">{translate('RESULTS')}</span>
              </Link>
            </li>
            <li
              className={
                'is-hidden-tablet ' +
                (location.pathname === path.authentification ? 'is-active' : '')
              }
            >
              <Link to={path.authentification} style={{ borderRadius: 0 }}>
                <Icon type={'light'} name="fa-user" />
                <span className="is-hidden-mobile">{translate('PROFILE')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
