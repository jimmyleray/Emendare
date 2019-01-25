/* eslint-disable sonarjs/cognitive-complexity */

import React from 'react'
import {
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  Link,
  ResultsIcon,
  Spacer,
  DataContext,
  UserContext
} from '../../components'
import { Amend, Socket } from '../../services'
import { path } from '../../config'

const unFollowText = id => async () => {
  await Socket.fetch('unFollowText', { id })
  Socket.emit('user')
}

const followText = id => async () => {
  await Socket.fetch('followText', { id })
  Socket.emit('user')
}

export const Text = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user }) => (
        <DataContext.Consumer>
          {({ get }) => {
            const group = get('group')(data.group)
            return (
              group &&
              group.data && (
                <>
                  <div className="field has-text-centered">
                    <h1 className="is-size-3">
                      {data.rules ? group.data.name : data.name}
                    </h1>
                    <h2 className="is-size-5">
                      {data.rules
                        ? 'Règles du groupe ' + group.data.name
                        : data.description}
                    </h2>
                    <p>
                      <span className="has-text-weight-semibold">
                        {data.followersCount +
                          ' participant' +
                          (data.followersCount > 1 ? 's' : '')}
                      </span>{' '}
                      -{' '}
                      {data.patches.length +
                        ' amendement' +
                        (data.patches.length > 1 ? 's' : '') +
                        ' accepté' +
                        (data.patches.length > 1 ? 's' : '')}
                    </p>
                  </div>
                  <br />

                  <Buttons>
                    {data.group && (
                      <Button to={path.group(data.group)}>
                        <Icon type="fas fa-chevron-left" />
                        <span>Retour au groupe</span>
                      </Button>
                    )}

                    <Spacer />

                    {isConnected() &&
                      (user.followedTexts.find(text => text === data._id) ? (
                        <Button
                          onClick={unFollowText(data._id)}
                          className="button is-light"
                          disabled={data.rules}
                        >
                          Ne plus participer au texte
                        </Button>
                      ) : (
                        <Button
                          onClick={followText(data._id)}
                          className="button is-success has-text-weight-semibold"
                          disabled={data.rules}
                        >
                          Participer à ce texte
                        </Button>
                      ))}

                    {isConnected() && (
                      <Button
                        to={path.edit(data._id)}
                        className="is-info"
                        onClick={followText(data._id)}
                      >
                        <Icon type="fas fa-plus" />
                        <span className="has-text-weight-semibold">
                          Proposer un amendement
                        </span>
                      </Button>
                    )}
                  </Buttons>

                  <Columns>
                    <Column>
                      <Box>
                        {data.actual &&
                          data.actual
                            .split('\n')
                            .map((line, index) =>
                              line ? (
                                <p key={index}>{line}</p>
                              ) : (
                                <br key={index} />
                              )
                            )}

                        {!data.actual && (
                          <p className="has-text-weight-semibold has-text-danger">
                            Texte actuellement vide
                          </p>
                        )}
                      </Box>
                    </Column>
                    <Column>
                      <Box>
                        {data.amends.length > 0 && (
                          <>
                            <p className="has-text-weight-semibold">
                              Liste des scrutins en cours
                            </p>
                            <br />
                            {data.amends
                              .map(get('amend'))
                              .filter(
                                amend =>
                                  amend && amend.data && !amend.data.closed
                              ).length > 0 ? (
                              <>
                                {data.amends
                                  .map(get('amend'))
                                  .filter(
                                    amend =>
                                      amend && amend.data && !amend.data.closed
                                  )
                                  .map(amend => (
                                    <div key={amend.data._id}>
                                      <ResultsIcon
                                        data={{
                                          up: amend.data.upVotesCount,
                                          down: amend.data.downVotesCount,
                                          ind: amend.data.indVotesCount,
                                          absent:
                                            (amend.data.totalPotentialVotesCount
                                              ? amend.data
                                                  .totalPotentialVotesCount
                                              : data.followersCount) -
                                            (amend.data.upVotesCount +
                                              amend.data.downVotesCount +
                                              amend.data.indVotesCount)
                                        }}
                                      />
                                      {' > '}

                                      <Link
                                        to={path.amend(amend.data._id)}
                                        className={
                                          user &&
                                          !Amend.isVoted(user)(amend.data)
                                            ? 'has-text-weight-bold'
                                            : ''
                                        }
                                      >
                                        {amend.data.name}
                                      </Link>
                                    </div>
                                  ))}
                              </>
                            ) : (
                              <p className="has-text-weight-semibold has-text-danger">
                                Aucun vote en cours
                              </p>
                            )}

                            {data.amends
                              .map(get('amend'))
                              .filter(
                                amend =>
                                  amend && amend.data && amend.data.closed
                              ).length > 0 && (
                              <>
                                <hr />
                                <p className="has-text-weight-semibold">
                                  Liste des anciens scrutins
                                </p>
                                <br />
                                {data.amends
                                  .map(get('amend'))
                                  .filter(
                                    amend =>
                                      amend && amend.data && amend.data.closed
                                  )
                                  .map(amend => amend.data)
                                  .sort(
                                    (a, b) =>
                                      new Date(b.finished).getTime() -
                                      new Date(a.finished).getTime()
                                  )
                                  .map(amend => (
                                    <p key={amend._id}>
                                      {amend.accepted && !amend.conflicted ? (
                                        <Icon
                                          className="fas fa-check-circle has-text-success"
                                          title="Accepté"
                                        />
                                      ) : (
                                        <Icon
                                          className="fas fa-times-circle has-text-danger"
                                          title="Refusé"
                                        />
                                      )}
                                      <Link to={path.amend(amend._id)}>
                                        {amend.name}
                                      </Link>
                                    </p>
                                  ))}
                              </>
                            )}
                          </>
                        )}

                        {data.amends.length === 0 && (
                          <p className="has-text-weight-semibold has-text-danger">
                            Aucun amendement proposé
                          </p>
                        )}
                      </Box>
                    </Column>
                  </Columns>
                </>
              )
            )
          }}
        </DataContext.Consumer>
      )}
    </UserContext.Consumer>
  )
}
