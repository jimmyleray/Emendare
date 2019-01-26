import React from 'react'
import { Redirect } from 'react-router-dom'
import { path } from '../../config'

export const NotificationsContext = React.createContext()

export class NotificationsProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectTo: null,
      permission: window.Notification && window.Notification.permission,
      request: () => {
        window.Notification.requestPermission(permission => {
          this.setState({ permission }, () => {
            if (permission === 'granted') {
              const notification = new window.Notification(
                'Bienvenue sur Emendare',
                {
                  body:
                    'Vous pouvez paramétrer en détails les notifications que vous souhaitez recevoir sur votre page de profil.',
                  icon: '/images/logo-white.png'
                }
              )
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

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />

    return (
      <NotificationsContext.Provider value={this.state}>
        {this.props.children}
      </NotificationsContext.Provider>
    )
  }
}
