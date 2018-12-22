/*
 * Page de texte
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser la version actuelle du texte
 * - TODO : d'accéder à la page pour amender le texte
 * - TODO : de visualiser les règles liées au texte
 * - TODO : de visualiser la liste des amendements
 * - TODO : d'accéder au détail d'un amendement
 * - TODO : de voter pour les amendements préferés
 * - TODO : de visualiser l'historique des modifications
 * - TODO : de visualiser le vote en cours
 * - TODO : de participer au vote en cours
 */

import React from 'react'
import { Text, Page } from '../components'
import { apiFetch } from '../utils'

export class TextPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: null
    }
  }

  fetchData() {
    apiFetch('/text/' + this.props.match.params.id).then(async res => {
      if (res.status === 200) {
        const text = await res.json()
        this.setState({ text })
      }
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData()
    }
  }

  render() {
    return (
      <Page
        title={
          this.state.text
            ? this.state.text.rules
              ? 'Règles de ' + this.state.text.group.name
              : this.state.text.name
            : 'Texte'
        }
      >
        {this.state.text && <Text data={this.state.text} />}
      </Page>
    )
  }
}
