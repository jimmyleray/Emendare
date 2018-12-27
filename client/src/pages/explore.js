/*
 * Page d'exploration
 * Le but de cette page est de permettre aux utilisateurs :
 * - de découvrir des contenus à suivre sur Emendare
 * - TODO : de suivre l'activité de la plateforme
 */

import React from 'react'
import { Page } from '../layouts'
import { Group } from '../components'
import { socket } from '../utils'

export class ExplorePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rootGroup: null
    }
  }

  componentDidMount() {
    socket.fetch('rootGroup').then(rootGroup => {
      this.setState({ rootGroup })
    })
  }

  render() {
    return (
      <Page title="Explorer">
        {this.state.rootGroup && <Group data={this.state.rootGroup} />}
      </Page>
    )
  }
}
