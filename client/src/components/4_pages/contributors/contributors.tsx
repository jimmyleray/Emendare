import React from 'react'
import { Avatar, Hero, Page, I18nContext } from '../../../components'
import { Socket } from '../../../services'

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
    const contributors = (await Socket.fetch('contributors')) as any[]
    this.setState({ contributors })
  }

  public componentWillUnmount() {
    Socket.off('contributors')
  }

  public render() {
    return (
      <I18nContext.Consumer>
        {({ translate }) => (
          <Page title="Contributeurs">
            <Hero
              title={translate('CONTRIBUTORS_THANKS')}
              subtitle={translate('CONTRIBUTE_GITHUB')}
              className="has-text-centered"
            />
            {this.state.contributors.length > 1 && (
              <div className="container is-size-5 has-text-centered">
                <span className="is-size-4">
                  {translate('THANKS_TO_USERS')}
                </span>
                <br />
                <br />
                <div
                  className="columns has-text-centered container is-flex"
                  style={{ flexWrap: 'wrap', justifyContent: 'center' }}
                >
                  {this.state.contributors
                    .filter(contributor => contributor.type === 'User')
                    .map(contributor => (
                      <div key={contributor.id} className="column is-2">
                        <Avatar
                          link={contributor.html_url}
                          imgUrl={contributor.avatar_url}
                          name={contributor.login}
                        />
                      </div>
                    ))}
                </div>
                <br />
                <span className="is-size-4">
                  {translate('THANKS_TO_TOOLS')}
                </span>
                <br />
                <br />
                <div
                  className="columns has-text-centered container is-flex"
                  style={{ flexWrap: 'wrap', justifyContent: 'center' }}
                >
                  {this.state.contributors
                    .filter(contributor => contributor.type === 'Bot')
                    .map(contributor => (
                      <div key={contributor.id} className="column is-2">
                        <Avatar
                          link={contributor.html_url}
                          imgUrl={contributor.avatar_url}
                          name={contributor.login}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Page>
        )}
      </I18nContext.Consumer>
    )
  }
}
