import React from 'react'
import { Avatar, Hero, Page, I18nContext } from '../../../components'
import { Socket } from '../../../services'

interface IContributorsPageState {
  contributors: any[]
}

const isHuman = (contributor: any) => contributor.type === 'User'
const isBot = (contributor: any) => contributor.type === 'Bot'

const AvatarCell = (contributor: any) => (
  <div key={contributor.id} className="column is-2">
    <Avatar
      link={contributor.html_url}
      imgUrl={contributor.avatar_url}
      name={contributor.login}
    />
  </div>
)

const AvatarsRow = (contributors: any[], isType: any) => (
  <React.Fragment>
    <br />
    <br />
    <div
      className="columns has-text-centered container is-flex"
      style={{ flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {contributors.filter(isType).map(AvatarCell)}
    </div>
  </React.Fragment>
)

export const ContributorsPage = () => {
  const [contributors, setContributors] = React.useState<any>([])

  React.useEffect(() => {
    Socket.fetch('contributors').then(setContributors)
    return () => {
      Socket.off('contributors')
    }
  }, [])

  return (
    <I18nContext.Consumer>
      {({ translate }) => (
        <Page title="Contributeurs">
          <Hero
            title={translate('CONTRIBUTORS_THANKS')}
            subtitle={translate('CONTRIBUTE_GITHUB')}
            className="has-text-centered"
          />
          {contributors.length > 1 && (
            <div className="container is-size-5 has-text-centered">
              <span className="is-size-4">{translate('THANKS_TO_USERS')}</span>
              {AvatarsRow(contributors, isHuman)}
              <br />
              <span className="is-size-4">{translate('THANKS_TO_TOOLS')}</span>
              {AvatarsRow(contributors, isBot)}
            </div>
          )}
        </Page>
      )}
    </I18nContext.Consumer>
  )
}
