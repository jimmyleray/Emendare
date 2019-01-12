/*
 * Page d'exploration
 * Le but de cette page est de permettre aux utilisateurs :
 * - de découvrir des contenus à suivre sur Emendare
 */

import React from 'react'
import { ErrorPage, Group, Page } from '../../components'
import { Socket } from '../../services'

export class ExplorePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rootGroup: null,
      error: null
    }
  }
  componentDidMount() {
    this.fetchData()
    Socket.on('rootGroup', ({ error, data }) => {
      if (!error) {
        this.setState({ rootGroup: data }, () => {
          Socket.emit('user')
        })
      }
    })
  }

  componentWillUnmount() {
    Socket.off('rootGroup')
  }

  fetchData() {
    Socket.fetch('rootGroup')
      .then(rootGroup => {
        this.setState({ rootGroup }, () => {
          Socket.emit('user')
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    if (this.state.error) return <ErrorPage error={this.state.error} />

    return (
      <Page title="Explorer">
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
