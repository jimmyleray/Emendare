import React from 'react'
import { Hero, Link, Page, I18nContext } from '../../../components'
import { Socket } from '../../../services'
import { Avatar } from '../../0_atoms/avatar/avatar'

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
            />
            {this.state.contributors.length > 1 && (
              <div className="container">
                {translate('THANKS_TO_USERS')}
                <br />
                <br />
                <div
                  className="columns has-text-centered container"
                  style={{ flexWrap: 'wrap' }}
                >
                  {this.state.contributors
                    .filter(contributor => contributor.type === 'User')
                    .map(contributor => (
                      <span key={contributor.id} className="column is-2">
                        <Avatar
                          link={contributor.html_url}
                          imgUrl={contributor.avatar_url}
                          name={contributor.login}
                        />
                      </span>
                    ))}
                </div>
                <br />
                {translate('THANKS_TO_TOOLS')}
                <br />
                <br />
                <div
                  className="columns has-text-centered container"
                  style={{ flexWrap: 'wrap' }}
                >
                  {this.state.contributors
                    .filter(contributor => contributor.type === 'Bot')
                    .map(contributor => (
                      <span key={contributor.id} className="column is-2">
                        <Avatar
                          link={contributor.html_url}
                          imgUrl={contributor.avatar_url}
                          name={contributor.login}
                        />
                      </span>
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
