/*
 * Page d'exploration
 * Le but de cette page est de permettre aux utilisateurs :
 * - de découvrir des contenus à suivre sur Emendare
 */

import React from 'react'
import { Group, Page } from '../components'
import { apiFetch } from '../utils'

export class ExplorePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rootGroup: null
    }
  }

  componentDidMount() {
    apiFetch('/rootGroup').then(async res => {
      if (res.status === 200) {
        const rootGroup = await res.json()
        this.setState({ rootGroup })
      }
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
