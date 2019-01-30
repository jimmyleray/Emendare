import React from 'react'
import { Redirect } from 'react-router-dom'
import { path } from '../../config'

export const NotificationsContext = React.createContext(
  {} as INotificationsProviderState
)

interface INotificationsProviderState {
  redirectTo: string | null
  permission: NotificationPermission
  requestPermission: () => void
}

export class NotificationsProvider extends React.Component<
  {},
  INotificationsProviderState
> {
  constructor(props: {}) {
    super(props)

    this.state = {
      redirectTo: null,
      permission: Notification.permission,
      requestPermission: () => {
        Notification.requestPermission(permission => {
          this.setState({ permission }, () => {
            if (permission === 'granted') {
              const notification = new Notification('Bienvenue sur Emendare', {
                body:
                  'Vous pouvez paramétrer en détails les notifications que vous souhaitez recevoir sur votre page de profil.',
                icon: '/images/logo-white.png'
              })
              notification.onclick = () => {
                this.setState({ redirectTo: path.profile }, () => {
                  this.setState({ redirectTo: null })
                })
              }
            }
          })
        })
      }
    }
  }

  public render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }

    return (
      <NotificationsContext.Provider value={this.state}>
        {this.props.children}
      </NotificationsContext.Provider>
    )
  }
}
