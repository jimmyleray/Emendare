import React from 'react'
import { Redirect } from 'react-router-dom'
import { Page } from '../components'
import { api } from '../utils'
import { UserContext } from '../contexts'

export class Login extends React.Component {
  constructor(props) {
    super(props)

    this.change = name => event => {
      this.setState({ [name]: event.target.value })
    }

    this.submit = login => event => {
      event.preventDefault()
      fetch(api('/login'), {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: this.state.password,
          email: this.state.email
        })
      }).then(async res => {
        if (res.status === 200) {
          const user = await res.json()
          login(user)
          this.setState({ redirectToProfile: true })
        } else {
          const errorMessage = await res.text()
          this.setState({ errorMessage })
        }
      })
    }

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      redirectToProfile: false
    }
  }

  render() {
    if (this.state.redirectToProfile) return <Redirect to="/profile" />

    return (
      <UserContext.Consumer>
        {({ login }) => (
          <Page title="Connexion">
            <form onSubmit={this.submit(login)}>
              <div className="field">
                <label className="label is-medium">Email</label>
                <p className="control has-icons-left has-icons-right">
                  <input
                    value={this.state.email}
                    onChange={this.change('email')}
                    className="input is-medium"
                    type="email"
                    autoFocus={true}
                  />
                  <span className="icon is-medium is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label is-medium">Mot de passe</label>
                <p className="control has-icons-left">
                  <input
                    value={this.state.password}
                    onChange={this.change('password')}
                    className="input is-medium"
                    type="password"
                  />
                  <span className="icon is-medium is-left">
                    <i className="fas fa-lock" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button type="submit" className="button is-medium is-success">
                    Connexion
                  </button>
                </p>
              </div>
              {this.state.errorMessage && (
                <div className="notification is-danger has-text-centered">
                  {this.state.errorMessage}
                </div>
              )}
            </form>
          </Page>
        )}
      </UserContext.Consumer>
    )
  }
}
