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

const unFollowGroup = id => async () => {
  await socket.fetch('unFollowGroup', { id })
  socket.emit('user')
}

const followGroup = id => async () => {
  await socket.fetch('followGroup', { id })
  socket.emit('user')
}

export const Group = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user }) => (
        <>
          <Buttons>
            {data.parent && (
              <Button to={'/groupe/' + data.parent._id}>
                <Icon type="fas fa-chevron-left" />
                <span>Retour au groupe parent</span>
              </Button>
            )}

            <Spacer />

            {isConnected() && (
              <Button className="is-info" to={'/texte/' + data.rules._id}>
                <Icon type="fas fa-cog" />
                <span>Voir les règles du groupe</span>
              </Button>
            )}

            {isConnected() &&
              (user.followedGroups.find(group => group._id === data._id) ? (
                <Button
                  onClick={unFollowGroup(data._id)}
                  className="is-danger is-outlined"
                >
                  Ne plus suivre ce groupe
                </Button>
              ) : (
                <Button onClick={followGroup(data._id)} className="is-success">
                  Suivre ce groupe
                </Button>
              ))}
          </Buttons>

          <Columns>
            <Column>
              <Box>
                <p className="has-text-weight-bold">{data.name}</p>
                <p>{data.description}</p>
              </Box>

              {data.subgroups.length > 0 && (
                <>
                  <p>Groupes</p>
                  <ul>
                    {data.subgroups.map(subgroup => (
                      <li key={subgroup._id}>
                        <Link to={'/groupe/' + subgroup._id}>
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
                        <Link to={'/texte/' + text._id}>{text.name}</Link>
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
