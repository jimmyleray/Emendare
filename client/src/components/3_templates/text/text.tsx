/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  Link,
  ResultsIcon,
  DataContext,
  UserContext,
  Hero,
  Spacer
} from '../../../components'
import { Amend, Socket, Pagination } from '../../../services'
import { IText } from '../../../../../interfaces'
import { path } from '../../../config'
import * as JsDiff from 'diff'
import { sortBy } from 'lodash'

export const Text = ({ data }: { data: IText }) => {
  const userContext = React.useContext(UserContext)
  const dataContext = React.useContext(DataContext)
  const [selectedTab, setSelectedTab] = React.useState('text')
  const [historyVersion, setHistoryVersion] = React.useState(
    (data && data.patches.length) || 0
  )

  const amends = data && data.amends.map(dataContext.get('amend'))

  let versionedText = ''
  if (data && data.patches.length > 0) {
    for (let index = 0; index < historyVersion; index++) {
      versionedText = JsDiff.applyPatch(versionedText, data.patches[index])
    }
  }

  return (
    data && (
      <React.Fragment>
        <Hero title={data.name} subtitle={data.description} />

        <div className="tabs is-boxed is-fullwidth">
          <ul>
            <li className={selectedTab === 'text' ? 'is-active' : ''}>
              <a
                onClick={() => {
                  setSelectedTab('text')
                }}
              >
                Texte
              </a>
            </li>
            <li className={selectedTab === 'votes' ? 'is-active' : ''}>
              <a
                onClick={() => {
                  setSelectedTab('votes')
                }}
              >
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
                  Scrutins
                </span>
              </a>
            </li>
            {data.patches.length > 0 && (
              <li className={selectedTab === 'history' ? 'is-active' : ''}>
                <a
                  onClick={() => {
                    setSelectedTab('history')
                  }}
                >
                  Historique
                </a>
              </li>
            )}
          </ul>
        </div>

        <Columns>
          {selectedTab === 'text' && (
            <Column>
              <Buttons className="is-centered">
                {userContext.isConnected() && (
                  <Button
                    to={path.edit(data._id)}
                    className="is-info"
                    onClick={() => {
                      Socket.emit('followText', { id: data._id })
                    }}
                  >
                    <Icon type="fas fa-plus" />
                    <span>Proposer un amendement</span>
                  </Button>
                )}

                <Spacer className="is-hidden-mobile" />

                {userContext.isConnected() &&
                  (userContext.user &&
                  userContext.user.followedTexts.find(
                    (text: any) => text === data._id
                  ) ? (
                    <Button
                      onClick={() => {
                        Socket.emit('unFollowText', { id: data._id })
                      }}
                      className="button is-light"
                    >
                      Ne plus participer au texte
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        Socket.emit('followText', { id: data._id })
                      }}
                      className="button is-success"
                    >
                      Participer à ce texte
                    </Button>
                  ))}
              </Buttons>

              {data.actual ? (
                <React.Fragment>
                  <p className="has-text-weight-semibold has-text-centered">
                    Version actuelle du texte
                  </p>
                  <br />
                </React.Fragment>
              ) : (
                <p className="has-text-danger has-text-centered">
                  Texte actuellement vide
                </p>
              )}

              {data.actual &&
                data.actual
                  .split('\n')
                  .map((line: string, index: number) =>
                    line ? <p key={index}>{line}</p> : <br key={index} />
                  )}
            </Column>
          )}

          {selectedTab === 'votes' && (
            <Column>
              {data.amends.length > 0 && (
                <React.Fragment>
                  <p className="has-text-weight-semibold">
                    Liste des scrutins en cours
                  </p>
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
                          <div key={amend.data._id}>
                            <ResultsIcon
                              data={{
                                up: amend.data.results.upVotesCount,
                                down: amend.data.results.downVotesCount,
                                ind: amend.data.results.indVotesCount,
                                absent:
                                  (amend.data.results.totalPotentialVotesCount
                                    ? amend.data.results
                                        .totalPotentialVotesCount
                                    : data.followersCount) -
                                  (amend.data.results.upVotesCount +
                                    amend.data.results.downVotesCount +
                                    amend.data.results.indVotesCount)
                              }}
                            />
                            {' > '}

                            <Link
                              to={path.amend(amend.data._id)}
                              className={
                                userContext.isConnected() &&
                                !Amend.isVoted(userContext.user)(amend.data)
                                  ? 'has-text-weight-bold'
                                  : ''
                              }
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
                      <p className="has-text-weight-semibold">
                        Liste des anciens scrutins
                      </p>
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
                          <p key={amend._id}>
                            {amend.conflicted ? (
                              <Icon
                                type="fas fa-minus-circle"
                                className="has-text-dark"
                                title="Refusé à cause d'un conflit technique"
                              />
                            ) : amend.accepted ? (
                              <Icon
                                type="fas fa-check-circle"
                                className="has-text-success"
                                title="Accepté par les participants"
                              />
                            ) : (
                              <Icon
                                type="fas fa-times-circle"
                                className="has-text-danger"
                                title="Refusé par les participants"
                              />
                            )}
                            <Link to={path.amend(amend._id)}>{amend.name}</Link>
                          </p>
                        ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}

              {data.amends.length === 0 && (
                <p className="has-text-danger">Aucun amendement proposé</p>
              )}
            </Column>
          )}

          {selectedTab === 'history' && (
            <Column>
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
                </React.Fragment>
              ) : (
                <p className="has-text-danger has-text-centered">
                  Texte actuellement vide
                </p>
              )}

              {versionedText
                .split('\n')
                .map((line: string, index: number) =>
                  line ? <p key={index}>{line}</p> : <br key={index} />
                )}
            </Column>
          )}
        </Columns>
      </React.Fragment>
    )
  )
}
