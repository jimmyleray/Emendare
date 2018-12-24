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
import { Page } from '../layouts'
import { Edit } from '../components'
import { apiFetch } from '../utils'

export class EditPage extends React.Component {
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
            ? 'Amendement de ' + this.state.text.group.name
            : 'Amendement'
        }
      >
        {this.state.text && <Edit data={this.state.text} />}
      </Page>
    )
  }
}
