import React from 'react'
import { Hero, Link, Page, I18nContext } from '../../../components'
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
    const contributors = ((await Socket.fetch(
      'contributors'
    )) as any[]).reverse()
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
              <div>
                {translate('THANKS_TO')}{' '}
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
        )}
      </I18nContext.Consumer>
    )
  }
}
