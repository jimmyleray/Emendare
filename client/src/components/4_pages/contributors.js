import React from 'react'
import { Page } from '../../components'
import { socket } from '../../services'
import { shuffle } from 'lodash'

export class ContributorsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contributors: null
    }
  }

  async componentDidMount() {
    const contributors = shuffle(await socket.fetch('contributors'))
    this.setState({ contributors })
  }

  render() {
    return (
      <Page title="Contributeurs">
        <div className="field has-text-centered">
          <h1 className="is-size-3">Remerciements à tous les contributeurs</h1>
          <h2 className="is-size-5">
            Pour contribuer à la plateforme rendez-vous sur le{' '}
            <a href="https://gitlab.com/emendare/emendare">
              GitLab officiel d'Emendare
            </a>
          </h2>
        </div>
        <br />
        {this.state.contributors && this.state.contributors.length > 1 && (
          <div className="has-text-centered">
            Merci à{' '}
            {Object.keys(this.state.contributors)
              .map(key => this.state.contributors[key].name)
              .join(', ')}
          </div>
        )}
      </Page>
    )
  }
}
