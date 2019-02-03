import React from 'react'
import { Link, Page } from '../../../components'
import { Socket } from '../../../services'
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
            <Link to="https://github.com/jimmyleray/Emendare">
              GitHub d'Emendare
            </Link>
          </h2>
        </div>
        <br />
        {this.state.contributors.length > 1 && (
          <div className="has-text-centered">
            Merci à{' '}
            {this.state.contributors.map((contributor, index, arr) => (
              <span key={contributor.author.path}>
                <Link to={'https://github.com' + contributor.author.path}>
                  {contributor.author.login}
                </Link>
                {index < arr.length - 1 && <span>{', '}</span>}
              </span>
            ))}
          </div>
        )}
      </Page>
    )
  }
}
