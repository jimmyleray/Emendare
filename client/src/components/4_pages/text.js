/*
 * Page de texte
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser la version actuelle du texte
 * - d'accéder à la page pour amender le texte
 * - de visualiser la liste des amendements
 * - d'accéder au détail d'un amendement
 * - TODO : de voter pour les amendements préferés
 * - TODO : de visualiser l'historique des modifications
 * - TODO : de visualiser le vote en cours
 * - TODO : de participer au vote en cours
 * - TODO : de suivre l'activité du texte
 */

import React from 'react'
import { Text, Page, ErrorPage } from '../../components'
import { socket } from '../../services'

export class TextPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: null,
      error: null
    }
  }

  fetchData() {
    socket
      .fetch('text', { id: this.props.match.params.id })
      .then(text => {
        this.setState({ text })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    socket.off('text')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData()
    }
  }

  getTitle() {
    return this.state.text
      ? this.state.text.rules
        ? 'Règles de ' + this.state.text.group.name
        : this.state.text.name
      : 'Texte'
  }

  render() {
    if (this.state.error) return <ErrorPage />

    return (
      <Page title={this.getTitle()}>
        {this.state.text && (
          <Text data={this.state.text} refetch={this.fetchData.bind(this)} />
        )}
      </Page>
    )
  }
}
