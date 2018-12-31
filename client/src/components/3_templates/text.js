import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  Results,
  Spacer,
  UserContext
} from '../../components'
import { socket } from '../../services'
import { path } from '../../config'

const unFollowText = id => refetch => async () => {
  await socket.fetch('unFollowText', { id })
  socket.emit('user')
  refetch()
}

const followText = id => refetch => async () => {
  await socket.fetch('followText', { id })
  socket.emit('user')
  refetch()
}

export const Text = ({ data, refetch }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user }) => (
        <>
          <Buttons>
            {data.group && (
              <Button to={path.group(data.group._id)}>
                <Icon type="fas fa-chevron-left" />
                <span>Retour au groupe</span>
              </Button>
            )}

            <Spacer />

            {isConnected() &&
              (user.followedTexts.find(text => text._id === data._id) ? (
                <Button
                  onClick={unFollowText(data._id)(refetch)}
                  className="button is-danger is-outlined"
                  disabled={data.rules}
                >
                  Ne plus participer à ce texte
                </Button>
              ) : (
                <Button
                  onClick={followText(data._id)(refetch)}
                  className="button is-success"
                  disabled={data.rules}
                >
                  Participer à ce texte
                </Button>
              ))}

            {isConnected() && (
              <Button
                to={path.edit(data._id)}
                className="is-info"
                disabled={
                  data.rules ||
                  !user.followedTexts.find(text => text._id === data._id)
                }
              >
                <Icon type="fas fa-plus" />
                <span>Proposer un amendement</span>
              </Button>
            )}
          </Buttons>

          <Columns>
            <Column>
              <Box>
                <p>
                  {data.rules ? 'Paramètres' : data.group.name} |{' '}
                  <span className="has-text-weight-semibold">
                    {data.rules ? data.group.name : data.name}
                  </span>
                </p>
                <p>
                  {data.rules
                    ? 'Règles du groupe ' + data.group.name
                    : data.description}
                </p>
                <p>
                  <span className="has-text-weight-semibold">
                    {data.followersCount +
                      ' contributeur' +
                      (data.followersCount > 1 ? 's' : '')}
                  </span>{' '}
                  -{' '}
                  {data.version +
                    ' amendement' +
                    (data.version > 1 ? 's' : '') +
                    ' accepté' +
                    (data.version > 1 ? 's' : '')}
                </p>
              </Box>

              <div>
                {data.actual
                  .split('\n')
                  .map((line, index) =>
                    line ? <p key={index}>{line}</p> : <br key={index} />
                  )}
              </div>
            </Column>
            <Column>
              <Box>
                <p className="is-size-5 has-text-centered has-text-weight-semibold">
                  Vote en cours sur l'amendement
                </p>
                <Results value={54.7} />
              </Box>
              <Box>
                <p>Liste des amendements proposés</p>
                <ul>
                  {data.amends.map(amend => (
                    <li key={amend._id}>
                      <Link to={path.amend(amend._id)}>{amend.name}</Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Column>
          </Columns>
        </>
      )}
    </UserContext.Consumer>
  )
}
