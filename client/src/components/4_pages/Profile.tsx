/*
 * Page de profil
 * Le but de cette page est de permettre aux utilisateurs :
 * - TODO : de visualiser les informations liées à son compte
 * - TODO : de supprimer leur compte et leurs données
 * - TODO : de changer d'email
 * - TODO : de changer de mot de passe
 * - de visualiser l'ensemble des contenus suivis
 * - TODO : de paramétrer les détails de son compte
 */

import React from 'react'
import {
  Box,
  Button,
  Column,
  Columns,
  Link,
  Page,
  NotificationSettings,
  DataContext,
  UserContext
} from '..'
import { path } from '../../config'

export const ProfilePage = () => (
  <Page title="Profil">
    <UserContext.Consumer>
      {({ user, logout }) => (
        <DataContext.Consumer>
          {({ get }) => {
            return (
              <>
                <div className="field has-text-centered">
                  <h1 className="is-size-3">Mon profil</h1>
                  <h2 className="is-size-5">{user.email}</h2>
                  <br />
                  <Button onClick={logout} className="is-danger is-medium">
                    Se déconnecter
                  </Button>
                </div>
                <br />
                <Columns>
                  <Column>
                    <Box>
                      <p className="has-text-weight-semibold">
                        Liste des groupes que vous avez rejoint
                      </p>
                      {user.followedGroups.length > 0 ? (
                        <ul>
                          {user.followedGroups
                            .map(get('group'))
                            .filter((group: any) => group && group.data)
                            .map((group: any) => group.data)
                            .map((followedGroup: any) => (
                              <li key={followedGroup._id}>
                                <Link to={path.group(followedGroup._id)}>
                                  {followedGroup.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p className="has-text-weight-semibold has-text-danger">
                          Aucun groupe rejoint
                        </p>
                      )}
                      <br />

                      <p className="has-text-weight-semibold">
                        Liste des textes auxquels vous participez
                      </p>
                      {user.followedTexts.length > 0 ? (
                        <ul>
                          {user.followedTexts
                            .map(get('text'))
                            .filter((text: any) => text && text.data)
                            .map((text: any) => text.data)
                            .map((followedText: any) => (
                              <li key={followedText._id}>
                                <Link to={path.text(followedText._id)}>
                                  {followedText.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p className="has-text-weight-semibold has-text-danger">
                          Aucun texte suivi
                        </p>
                      )}
                      <br />

                      <p className="has-text-weight-semibold">
                        Liste des amendements que vous avez proposés
                      </p>
                      {user.amends.length > 0 ? (
                        <ul>
                          {user.amends
                            .map(get('amend'))
                            .filter((amend: any) => amend && amend.data)
                            .map((amend: any) => amend.data)
                            .map((amend: any) => (
                              <li key={amend._id}>
                                <Link to={path.amend(amend._id)}>
                                  {amend.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p className="has-text-weight-semibold has-text-danger">
                          Aucun amendement proposé
                        </p>
                      )}
                    </Box>
                  </Column>

                  <Column>
                    <NotificationSettings user={user} />
                  </Column>
                </Columns>
              </>
            )
          }}
        </DataContext.Consumer>
      )}
    </UserContext.Consumer>
  </Page>
)
