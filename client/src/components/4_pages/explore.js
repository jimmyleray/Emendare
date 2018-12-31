/*
 * Page d'exploration
 * Le but de cette page est de permettre aux utilisateurs :
 * - de découvrir des contenus à suivre sur Emendare
 */

import React from 'react'
import { Group, Notification, Page } from '../../components'
import { socket } from '../../services'

export class ExplorePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rootGroup: null
    }
  }
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    socket.fetch('rootGroup').then(rootGroup => {
      this.setState({ rootGroup })
    })
  }

  render() {
    return (
      <Page title="Explorer">
        <Notification className="is-warning has-text-centered">
          <p>
            Cette page est celle du{' '}
            <span className="has-text-weight-semibold">
              groupe principal de la plateforme Emendare
            </span>
          </p>
          <p>
            Vous pouvez accéder à tous les sous-groupes et à tous leurs textes à
            partir d'ici
          </p>
        </Notification>
        {this.state.rootGroup && (
          <Group
            data={this.state.rootGroup}
            refetch={this.fetchData.bind(this)}
          />
        )}
      </Page>
    )
  }
}
