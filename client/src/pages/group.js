/*
 * Page de groupe
 * Le but de cette page est de permettre aux utilisateurs :
 * - d'accéder aux pages de textes du groupe
 * - d'accéder aux pages de sous-groupes du groupe
 * - TODO : de visualiser les règles de gestion du groupe
 * - TODO : de suivre les évènements liés au groupe
 */

import React from 'react'
import { Group, Page } from '../components'
import { apiFetch } from '../utils'

export class GroupPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      group: null
    }
  }

  fetchData() {
    apiFetch('/group/' + this.props.match.params.id).then(async res => {
      if (res.status === 200) {
        const group = await res.json()
        this.setState({ group })
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
      <Page title="Groupe">
        {this.state.group && <Group data={this.state.group} />}
      </Page>
    )
  }
}
