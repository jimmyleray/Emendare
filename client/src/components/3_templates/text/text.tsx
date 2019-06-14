/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Button,
  Buttons,
  Icon,
  Link,
  DataContext,
  useUser,
  Notification,
  Hero,
  Spacer,
  Background,
  I18nContext,
  Tabs,
  ProposeAmend,
  ApiContext
} from '../../../components'
import { Pagination } from '../../../services'
import { IText } from '../../../../../interfaces'
import { path } from '../../../config'
import sortBy from 'lodash/sortBy'
import { applyPatch } from 'diff'

export const Text = ({
  data,
  location
}: {
  data: IText
  location?: Location
}) => {
  const userContext = useUser()
  const dataContext = React.useContext(DataContext)
  const i18nContext = React.useContext(I18nContext)
  const { translate } = i18nContext
  const { Socket } = React.useContext(ApiContext)

  const [historyVersion, setHistoryVersion] = React.useState(
    (data && data.patches.length) || 0
  )

  const amends = data && data.amends.map(dataContext.get('amend'))

  let versionedText = ''
  if (data && data.patches.length > 0) {
    for (let index = 0; index < historyVersion; index++) {
      versionedText = applyPatch(versionedText, data.patches[index])
    }
  }

  return (
    data && (
      <React.Fragment>
        <Hero
          title={data.name}
          subtitle={data.description}
          className="has-text-centered"
        />
        <Tabs tabsName={['text', 'votes', 'historic']} location={location}>
          <Tabs.Menu className="is-fullwidth">
            <Tabs.Tab to="text">{translate('TEXT')}</Tabs.Tab>
            <Tabs.Tab to="votes">
              <span
                className={
                  amends.filter(
                    (amend: any) => amend && amend.data && !amend.data.closed
                  ).length > 0
                    ? 'badge is-badge-danger'
                    : ''
                }
                data-badge={
                  amends.filter(
                    (amend: any) => amend && amend.data && !amend.data.closed
                  ).length
                }
              >
                {translate('AMENDS')}
              </span>
            </Tabs.Tab>
            {false && <Tabs.Tab to="rules">{translate('RULES')}</Tabs.Tab>}
            <Tabs.Tab to="historic">{translate('HISTORY')}</Tabs.Tab>
          </Tabs.Menu>
          <Tabs.Content for="text">
            <React.Fragment>
              <Buttons className="is-centered">
                {userContext.isConnected() && <ProposeAmend text={data} />}

                <Spacer className="is-hidden-mobile" />

                {userContext.isConnected() &&
                  (userContext.user &&
                  userContext.user.followedTexts.find(
                    (text: any) => text === data.id
                  ) ? (
                    <Button
                      onClick={() => {
                        Socket.emit('unFollowText', { id: data.id })
                      }}
                      className="button is-success is-outlined"
                    >
                      Ne plus participer au texte
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        Socket.emit('followText', { id: data.id })
                      }}
                      className="button is-success"
                    >
                      Participer à ce texte
                    </Button>
                  ))}
              </Buttons>

              {data.actual ? (
                <React.Fragment>
                  <p className="has-text-weight-semibold has-text-centered ">
                    Version actuelle du texte
                  </p>
                  <br />
                  <Background className="has-background-light">
                    {data.actual &&
                      data.actual
                        .split('\n')
                        .map((line: string, index: number) =>
                          line ? <p key={index}>{line}</p> : <br key={index} />
                        )}
                  </Background>
                </React.Fragment>
              ) : (
                <p className="has-text-danger has-text-centered">
                  Texte actuellement vide
                </p>
              )}
            </React.Fragment>
          </Tabs.Content>
          <Tabs.Content for="votes">
            <React.Fragment>
              {data.amends.length > 0 && (
                <React.Fragment>
                  <p className="has-text-weight-semibold">Votes en cours</p>
                  <br />
                  {amends.filter(
                    (amend: any) => amend && amend.data && !amend.data.closed
                  ).length > 0 ? (
                    <React.Fragment>
                      {amends
                        .filter(
                          (amend: any) =>
                            amend && amend.data && !amend.data.closed
                        )
                        .map((amend: any) => (
                          <div key={amend.data.id}>
                            {' > '}
                            <Link
                              to={path.amend(amend.data.id)}
                              className="has-text-weight-bold"
                            >
                              {amend.data.name}
                            </Link>
                          </div>
                        ))}
                    </React.Fragment>
                  ) : (
                    <p className="has-text-danger">Aucun vote en cours</p>
                  )}

                  {amends.filter(
                    (amend: any) => amend && amend.data && amend.data.closed
                  ).length > 0 && (
                    <React.Fragment>
                      <hr />
                      <p className="has-text-weight-semibold">Votes clos</p>
                      <br />
                      {sortBy(
                        amends
                          .filter(
                            (amend: any) =>
                              amend && amend.data && amend.data.closed
                          )
                          .map((amend: any) => amend.data),
                        ['finished']
                      )
                        .reverse()
                        .map((amend: any) => (
                          <p key={amend.id}>
                            {amend.conflicted ? (
                              <Icon
                                type={'solid'}
                                name="fa-minus-circle"
                                className="has-text-dark"
                                title="Refusé à cause d'un conflit technique"
                              />
                            ) : amend.accepted ? (
                              <Icon
                                type={'solid'}
                                name="fa-check-circle"
                                className="has-text-success"
                                title="Accepté par les participants"
                              />
                            ) : (
                              <Icon
                                type={'solid'}
                                name="fa-times-circle"
                                className="has-text-danger"
                                title="Refusé par les participants"
                              />
                            )}
                            <Link to={path.amend(amend.id)}>{amend.name}</Link>
                          </p>
                        ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}

              {data.amends.length === 0 && (
                <p className="has-text-danger">Aucun amendement proposé</p>
              )}
            </React.Fragment>
          </Tabs.Content>
          <Tabs.Content for="rules">
            <Notification className="is-warning">
              Cette fonctionnalité sera bientôt disponible et vous permettra de
              consulter et de proposer des modifications des règles des textes
            </Notification>
          </Tabs.Content>
          <Tabs.Content for="historic">
            <React.Fragment>
              <nav
                className="pagination is-right is-rounded"
                role="navigation"
                aria-label="pagination"
              >
                <Button
                  className="pagination-previous"
                  disabled={historyVersion <= 1}
                  onClick={() => {
                    setHistoryVersion(historyVersion - 1)
                  }}
                >
                  Précédent
                </Button>
                <Button
                  className="pagination-next"
                  disabled={historyVersion >= data.patches.length}
                  onClick={() => {
                    setHistoryVersion(historyVersion + 1)
                  }}
                >
                  Suivant
                </Button>
                <ul className="pagination-list">
                  {Pagination.getRange(
                    1,
                    data.patches.length,
                    historyVersion
                  ).map((version, index) => {
                    return version === '&' ? (
                      <li key={index}>
                        <span className="pagination-ellipsis">&hellip;</span>
                      </li>
                    ) : (
                      <li key={index}>
                        <a
                          className={
                            'pagination-link ' +
                            (version === historyVersion ? 'is-current' : '')
                          }
                          aria-label={'Goto page ' + version}
                          onClick={() => {
                            setHistoryVersion(version)
                          }}
                        >
                          {version}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <br />

              {data.patches.length > 0 ? (
                <React.Fragment>
                  <p className="has-text-weight-semibold has-text-centered">
                    Version{' '}
                    {historyVersion === data.patches.length
                      ? 'actuelle'
                      : 'n°' + historyVersion}{' '}
                    du texte
                  </p>
                  <br />
                  <Background className="has-background-light">
                    {versionedText
                      .split('\n')
                      .map((line: string, index: number) =>
                        line ? <p key={index}>{line}</p> : <br key={index} />
                      )}
                  </Background>
                </React.Fragment>
              ) : (
                <p className="has-text-danger has-text-centered">
                  Texte actuellement vide
                </p>
              )}
            </React.Fragment>
          </Tabs.Content>
        </Tabs>
      </React.Fragment>
    )
  )
}
