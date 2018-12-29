/*
 * Page d'amendement
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser la version actuelle du texte
 * - d'éditer le texte et de visualiser les modification
 * - d'écrire un argumentaire pour défendre l'amendement
 * - de valider l'ajout de l'amendement à la liste du texte
 * - TODO : de mettre à jour l'amendement sur la dernière version du texte
 * - d'accéder au détail d'un amendement
 */

import React from 'react'
import { Edit, Page, ErrorPage } from '../../components'
import { socket } from '../../services'

export class EditPage extends React.Component {
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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData()
    }
  }

  getTitle() {
    return this.state.text
      ? 'Amendement de ' + this.state.text.group.name
      : 'Amendement'
  }

  render() {
    if (this.state.error) return <ErrorPage />

    return (
      <Page title={this.getTitle()}>
        {this.state.text && <Edit data={this.state.text} />}
      </Page>
    )
  }
}
