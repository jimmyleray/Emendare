import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  Spacer,
  UserContext
} from '../../components'
import { socket } from '../../services'
import { path } from '../../config'

const quitGroup = id => refetch => async () => {
  await socket.fetch('quitGroup', { id })
  socket.emit('user')
  refetch()
}

const joinGroup = id => refetch => async () => {
  await socket.fetch('joinGroup', { id })
  socket.emit('user')
  refetch()
}

export const Group = ({ data, refetch }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user }) => (
        <>
          <Buttons>
            {data.parent && (
              <Button to={path.group(data.parent._id)}>
                <Icon type="fas fa-chevron-left" />
                <span>Retour au groupe parent</span>
              </Button>
            )}

            <Spacer />

            {isConnected() &&
              (user.followedGroups.find(group => group._id === data._id) ? (
                <Button
                  onClick={quitGroup(data._id)(refetch)}
                  className="is-light"
                >
                  Quitter le groupe
                </Button>
              ) : (
                <Button
                  onClick={joinGroup(data._id)(refetch)}
                  className="is-success"
                >
                  Rejoindre le groupe
                </Button>
              ))}

            {isConnected() && (
              <Button
                className="is-info"
                to={path.text(data.rules._id)}
                disabled
              >
                <Icon type="fas fa-cog" />
                <span>Voir les règles du groupe</span>
              </Button>
            )}
          </Buttons>

          <Columns>
            <Column>
              <Box>
                <p className="has-text-weight-bold">{data.name}</p>
                <p>{data.description}</p>
                <p className="has-text-weight-semibold">
                  {data.followersCount +
                    ' membre' +
                    (data.followersCount > 1 ? 's' : '')}
                </p>
              </Box>

              {data.subgroups.length > 0 && (
                <>
                  <p>Groupes</p>
                  <ul>
                    {data.subgroups.map(subgroup => (
                      <li key={subgroup._id}>
                        <Link to={path.group(subgroup._id)}>
                          {subgroup.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {data.texts.length > 0 && (
                <>
                  <p>Textes</p>
                  <ul>
                    {data.texts.map(text => (
                      <li key={text._id}>
                        <Link to={path.text(text._id)}>{text.name}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Column>
            <Column>
              <Box>
                <p>Votes en cours dans le groupe</p>
              </Box>
            </Column>
          </Columns>
        </>
      )}
    </UserContext.Consumer>
  )
}
