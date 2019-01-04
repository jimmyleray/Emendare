/*
 * Page de groupe
 * Le but de cette page est de permettre aux utilisateurs :
 * - d'accéder aux pages de textes du groupe
 * - d'accéder aux pages de sous-groupes du groupe
 * - TODO : de visualiser les règles de gestion du groupe
 * - TODO : de suivre les évènements liés au groupe
 * - TODO : de suivre l'activité du groupe
 */

import React from 'react'
import { Group, Page, ErrorPage } from '../../components'
import { socket } from '../../services'

export class GroupPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      group: null,
      error: null
    }
  }

  fetchData() {
    socket
      .fetch('group', { id: this.props.match.params.id })
      .then(group => {
        this.setState({ group }, () => {
          socket.emit('user')
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  componentDidMount() {
    this.fetchData()
    socket.on('group/' + this.props.match.params.id, ({ error, data }) => {
      if (!error) {
        this.setState({ group: data }, () => {
          socket.emit('user')
        })
      }
    })
  }

  componentWillUnmount() {
    socket.off('group')
    socket.off('group/' + this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData()
    }
  }

  getTitle() {
    return this.state.group ? this.state.group.name : 'Groupe'
  }

  render() {
    if (this.state.error) return <ErrorPage error={this.state.error} />

    return (
      <Page title={this.getTitle()}>
        {this.state.group && (
          <Group data={this.state.group} refetch={this.fetchData.bind(this)} />
        )}
      </Page>
    )
  }
}
