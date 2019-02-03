import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  DataContext,
  UserContext
} from '../../../components'
import { Socket } from '../../../services'
import { path } from '../../../config'

const quitGroup = (id: string) => () => {
  Socket.emit('quitGroup', { id })
}

const joinGroup = (id: string) => () => {
  Socket.emit('joinGroup', { id })
}

export const Group = ({ data }: any) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user }) => (
        <DataContext.Consumer>
          {({ get }) => {
            return (
              <>
                <div className="field has-text-centered">
                  <h1 className="is-size-3">{data.name}</h1>
                  <h2 className="is-size-5">{data.description}</h2>
                  <p className="has-text-weight-semibold">
                    {data.followersCount +
                      ' membre' +
                      (data.followersCount > 1 ? 's' : '')}
                  </p>
                </div>
                <br />

                <Buttons>
                  <Button
                    to={data.parent ? path.group(data.parent) : path.home}
                  >
                    <Icon type="fas fa-chevron-left" />
                    <span>
                      {data.parent
                        ? 'Retour au groupe parent'
                        : "Retour à l'accueil"}
                    </span>
                  </Button>

                  {isConnected() &&
                    (user.followedGroups.find(
                      (group: any) => group === data._id
                    ) ? (
                      <Button
                        onClick={quitGroup(data._id)}
                        className="is-light"
                      >
                        Quitter le groupe
                      </Button>
                    ) : (
                      <Button
                        onClick={joinGroup(data._id)}
                        className="is-success"
                      >
                        Rejoindre le groupe
                      </Button>
                    ))}
                </Buttons>

                <Columns>
                  <Column>
                    <Box>
                      {data.subgroups.length > 0 && (
                        <>
                          <p>Groupes</p>
                          <ul>
                            {data.subgroups
                              .map(get('group'))
                              .map((subgroup: any) => {
                                return (
                                  subgroup &&
                                  subgroup.data && (
                                    <li key={subgroup.data._id}>
                                      <Link to={path.group(subgroup.data._id)}>
                                        {subgroup.data.name}
                                      </Link>
                                    </li>
                                  )
                                )
                              })}
                          </ul>
                        </>
                      )}

                      {data.subgroups.length > 0 && data.texts.length > 0 && (
                        <hr />
                      )}

                      {data.texts.length > 0 && (
                        <>
                          <p>Textes</p>
                          <ul>
                            {data.texts.map(get('text')).map((text: any) => {
                              return (
                                text &&
                                text.data && (
                                  <li key={text.data._id}>
                                    <Link to={path.text(text.data._id)}>
                                      {text.data.name}
                                    </Link>
                                  </li>
                                )
                              )
                            })}
                          </ul>
                        </>
                      )}
                    </Box>
                  </Column>
                  <Column>
                    <Box>
                      <p>Votes en cours dans le groupe</p>
                    </Box>
                  </Column>
                </Columns>
              </>
            )
          }}
        </DataContext.Consumer>
      )}
    </UserContext.Consumer>
  )
}
