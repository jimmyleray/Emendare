import React from 'react'
import { Page } from '..'
import { Socket } from '../../services'
import { shuffle } from 'lodash'

interface IContributorsPageState {
  contributors: any[]
}

export class ContributorsPage extends React.Component<
  {},
  IContributorsPageState
> {
  constructor(props: {}) {
    super(props)

    this.state = {
      contributors: []
    }
  }

  public async componentDidMount() {
    const contributors = shuffle(await Socket.fetch('contributors'))
    this.setState({ contributors })
  }

  public componentWillUnmount() {
    Socket.off('contributors')
  }

  public render() {
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
        {this.state.contributors.length > 1 && (
          <div className="has-text-centered">
            Merci à{' '}
            {this.state.contributors
              .map(contributor => contributor.name)
              .join(', ')}
          </div>
        )}
      </Page>
    )
  }
}
